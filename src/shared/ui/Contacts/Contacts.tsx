import { Stack, Text } from "@mantine/core";

type Contacts = {
	address: string;
	hours: string;
	phone: string;
}

const Contacts = ({ address, hours, phone }: Contacts) => {
	return (
		<Stack>
			{address && (
				<Text>Адрес: <Text span fw={600}>{address}</Text></Text>
			)}
			{hours && (
				<Text>Время работы: <Text span fw={600}>{hours}</Text></Text>
			)}
			{phone && (
				<Text>Телефон: <Text span fw={600}>{phone}</Text></Text>
			)}
		</Stack>
	);
}

export default Contacts;
