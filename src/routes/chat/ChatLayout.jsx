import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ChatLayout() {
	return (
		<div>
			<Outlet />
		</div>
	);
}