import { useLayoutEffect, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { useLocalStorageState } from 'ahooks';
import { IconCast } from "@tabler/icons-react";

import { client } from "@/shared/graphql/client";
// @ts-ignore
import { BROADCAST_SUBSCRIPTION } from "@/shared/graphql/queries/broadcasts/queries.graphql";

import { BroadcastContextProvider } from "./context";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const BroadcastProvider = ({ children }: { children: ReactNode }) => {
	const [hasBroadcast, setHasBroadcast] = useLocalStorageState<boolean>(
		'broadcast',
		{
			defaultValue: false,
		},
	);
	const [isEnabled, setIsEnabled] = useState(false);

	useIsomorphicLayoutEffect(() => {
		let subscription = { unsubscribe: () => { } };

		subscription = client
			.subscribe({
				query: BROADCAST_SUBSCRIPTION,
				variables: {
					slug: "broadcast",
				},
			})
			.subscribe({
				start: () => {
					console.info("Broadcast socket start");
				},
				next: ({ data, ...all }) => {
					console.info("Results subscribe broadcast ->", { data, all });

					const enabled = data.broadcasts?.[0]?.enabled;
					const title = data.broadcasts?.[0]?.title_full;

					if (hasBroadcast !== enabled) {
						if (enabled) {
							notifications.show({
								title: "Трансляция начата",
								message: title,
								icon: <IconCast />,
								sx: (_, fn) => ({
									top: 60,
									[fn.largerThan("md")]: {
										top: 90,
									},
								}),
								styles: (theme) => ({
									icon: {
										backgroundColor: "transparent",
										color: theme.colors.brand?.[4]
									}
								})
							});
						}

						setHasBroadcast(enabled);
					}

					setIsEnabled(enabled);
				},
				// complete: () => {
				//   console.log("complete")
				//   setIsLoading(false)
				// }
			});

		return () => {
			subscription.unsubscribe?.();
		};
	}, [hasBroadcast]);

	return <BroadcastContextProvider value={{ isEnabled }}>{children}</BroadcastContextProvider>;
};

export { BroadcastProvider };

if (process.env.NODE_ENV === "development") {
	BroadcastProvider.displayName = "BroadcastProvider";
}

