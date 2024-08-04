import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSchedulesByYM } from '../../libs/apis/schedule';
import { changeYYYYMMDD, getYM } from '../../utils/time';
import Calendar from 'react-calendar';
import '@/assets/css/Calendar.css';
import moment from 'moment';
import Schedule from './Schedule';
import AddSchedule from './AddSchedule';

export default function CalendarPage() {
	const { id, role } = useSelector(state => state.user);
	const [schedules, setSchedules] = useState([]);
	const [value, onChange] = useState(new Date());
	const [days, setDays] = useState([]);
	const [isAddSchedule, setIsAddSchedule] = useState(true);

	useEffect(() => {
		// TODO 달력에 사용할 데이터를 가져온다.
		// 달력이 월 기준이므로 '202407'로 전송하면 사용자의 schedules 데이터를 가져온다.
		const ym = getYM();
		// const resSchedules = getSchedulesByYM(id, ym);
		const today = '09:00';
		const resSchedules = [
			{
				id: 1,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
			{
				id: 2,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
			{
				id: 3,
				partner: '홍길동',
				dayTime: today,
				scheduleName: '누구누구누구와 약속',
				scheduleDescription: '약속 세부사항~~~~~~',
			},
		];
		setSchedules(resSchedules);

		setDays(['20240801', '20240806', '20240803', '20240804']);

	}, [value]);

	// const clickAddSchedule = () => {
	// 	alert("popup")
	// }

	return (
		<div className="bg-gray-100 h-screen ">
			<div className={`${isAddSchedule ? "opacity-10" : ""} w-full h-12 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 text-xl font-sans font-bold flex justify-center items-center relative`}>
				<div>일정</div>
				<button
					className="absolute right-4"
					data-modal-target="default-modal"
					data-modal-toggle="default-modal"
					onClick={() => setIsAddSchedule(!isAddSchedule)}
				>
					+
				</button>
			</div>
			<AddSchedule id="default-modal" isAddSchedule={isAddSchedule} setIsAddSchedule={setIsAddSchedule}/>
			<div className={`p-3 ${isAddSchedule ? "opacity-10" : ""}`}>
				<div className="container">
					<Calendar
						locale="en"
						calendarType="gregory"
						value={value}
						onChange={onChange} //useState로 날짜 포커스 변경 시 그 날짜 받아오기
						minDetail="month"
						maxDetail="month"
						formatDay={(local, date) => moment(date).format('DD')}
						showNeighboringMonth={false}
						className="mx-auto w-full text-sm"
						tileContent={({ date, view }) => {
							if (days.find(x => x === moment(date).format('YYYYMMDD'))) {
								return (
									<>
										<div className="flex justify-center items-center absoluteDiv">
											<div className="dot"></div>
										</div>
									</>
								);
							}
						}}
					/>
				</div>
				<div className="mt-6">
					<p className="px-1">Today's Meeting</p>
					{[...schedules].map(schedule => (
						<Schedule
							key={schedule.id}
							dayTime={schedule.dayTime}
							name={schedule.scheduleName}
							description={schedule.scheduleDescription}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
