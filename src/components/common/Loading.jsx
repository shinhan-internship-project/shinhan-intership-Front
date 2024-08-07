import React from 'react';

export default function Loading() {
	return (
		<div className="flex items-center justify-center h-[500px]">
			<div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
		</div>
	);
}