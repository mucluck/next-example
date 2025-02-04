import type { ReactNode } from "react";
import { useState } from "react";
import { SpotlightProvider } from '@mantine/spotlight';
import type { SpotlightAction } from "@mantine/spotlight";
import { IconSearch, IconDashboard, IconFileText } from "@tabler/icons-react";

const Spotlight = ({ children }: { children: ReactNode }) => {
  const [actions, setActions] = useState<Array<SpotlightAction>>([
        {
          title: 'Новости',
          description: 'Перейти к разделу новостей',
          onTrigger: () => console.log('Dashboard'),
          icon: <IconDashboard stroke={1} />,
        },
        {
          title: 'Статьи',
          description: 'Перейти к разделу статей',
          onTrigger: () => console.log('Documentation'),
          icon: <IconFileText stroke={1} />,
        },
  ]);

  return (
    <SpotlightProvider
      centered
      actions={actions}
      onActionsChange={setActions}
      searchIcon={<IconSearch />}
      searchPlaceholder={"Введите запрос..."}
    >
      {children}
    </SpotlightProvider>
  );
}

export default Spotlight;
