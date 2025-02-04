import { Text } from "@mantine/core";
import { useCountDown } from "ahooks";

const Countdown = ({ date }: { date: string }) => {
	const [countdown, formattedRes] = useCountDown({
		targetDate: new Date(date),
	});

	if (!countdown) {
		return (
			<Text span fw={600}>
				Вещаний не запланировано
			</Text>
		);
	}

	return (
		<Text span itemProp={"startDate"} content={date} fw={600}>
			До начала трансляции: {formattedRes.days} дней {formattedRes.hours} часов {formattedRes.minutes} минут
		</Text>
	);
};

export default Countdown;
