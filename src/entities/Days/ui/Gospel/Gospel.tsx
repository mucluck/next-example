import { useState } from "react";

import { Space, Stack, Group, Chip, Highlight } from "@mantine/core";

const Gospel = ({ text }: { text: Gospel }) => {
	const [value, setValue] = useState(["rus"]);

	return (
		<>
			<Space h={16} />

			<Stack>
				<Chip.Group multiple value={value} onChange={setValue}>
					<Group>
						<Chip value={"rus"} variant={"filled"}>дальный</Chip>
						<Chip value={"church"} variant={"filled"}>ославянский (рус)</Chip>
					</Group>
				</Chip.Group>

				{
					!!value.length && (
						<Group wrap={"nowrap"} align={"flex-start"}>
							{
								value.includes("rus") && (
									<Highlight
										highlight={['[', ']']}
										highlightStyles={(theme) => ({
											backgroundColor: theme.colors.red[9],
											fontWeight: 900,
											fontSize: 24,
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
										})}
										sx={(theme) => ({
											'& [data-highlight="["] + span': {
												backgroundColor: theme.colors.red[9],
												color: theme.colors.white[0],
											},
											'& [data-highlight="["]': {
												"&:before": {
													content: "'\\a'",
													whiteSpace: 'pre'
												}
											},
										})}
									>
										{`${text?.rus}`}
									</Highlight>
								)
							}
							{
								value.includes("church") && (
									<Highlight
										highlight={['[', ']']}
										highlightStyles={(theme) => ({
											backgroundColor: theme.colors.red[9],
											fontWeight: 900,
											fontSize: 24,
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
										})}
										sx={(theme) => ({
											'& [data-highlight="["] + span': {
												backgroundColor: theme.colors.red[9],
												color: theme.colors.white[0],
											},
											'& [data-highlight="["]': {
												"&:before": {
													content: "'\\a'",
													whiteSpace: 'pre'
												}
											},
										})}
									>
										{`${text?.church}`}
									</Highlight>
								)
							}
						</Group>
					)
				}
			</Stack>
		</>
	);
}

export default Gospel;
