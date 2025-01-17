import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// layout
import NavLayout from '../components/NavLayout';
import ChatLayout from '../routes/chat/ChatLayout';

// pages
import HomePage from '../routes/home/HomePage';
import CalendarPage from '../routes/calendar/CalendarPage';
import ChatPage from '../routes/chat/ChatPage';
import MyPage from '../routes/my/MyPage';
import LoginPage from '../routes/login/LoginPage';
import SignupPage from '../routes/login/SignupPage';
import ChatRoomPage from '../routes/chat/ChatRoomPage';
import ConsultingReservationPage from '../routes/chat/ConsultingReservationPage';
import LoginErrorPage from '../components/common/LoginErrorPage';

const router = createBrowserRouter([
	{
		path: "",
		element: <Navigate to="/home" replace />,
	},
	{
		path: '/login',
		element: <LoginPage />,
		index: true,
	},
	{
		path: '/signup',
		element: <SignupPage />,
		index: true,
	},
	{
		path: '',
		element: <NavLayout />,
		children: [
			{
				path: '/home',
				element: <HomePage />,
				index: true,
			},
			{
				path: '/calendar',
				element: <CalendarPage />,
				index: true,
			},
			{
				path: '/chat',
				element: <ChatLayout />,
				children: [
					{
						path: '',
						element: <ChatPage />,
						index: true,
					},
					{
						path: ':chatRoomCode',
						element: <ChatRoomPage />,
						index: true,
					},
					{
						path: ':chatRoomCode/reservation',
						element: <ConsultingReservationPage />,
						index: true,
					},
				],
			},
			{
				path: '/my',
				element: <MyPage />,
				index: true,
			},
			{
				path: '/check/login',
				element: <LoginErrorPage/>,
				index: true
			}
		],
	},
]);

export default router;
