import React from 'react';

// assets
import profile from '../../assets/profile.svg';
import info from '../../assets/information-circle.svg';

// components
import ButtonActive from '../../components/button/ButtonActive';

export default function PBCardListComponent({
	setIsModal,
	data,
	setSelectedPB,
}) {
	const clickDetailBtn = () => {
		setIsModal(true);
		setSelectedPB(data.id);
	};

	const type = {
		안정형: 'rgba(179, 220, 235, 0.8)',
		안정추구형: 'rgba(186, 200, 248, 0.8)',
		위험중립형: 'rgba(249, 231, 203, 0.8)',
		적극투자형: 'rgba(252, 205, 187, 0.8)',
		공격투자형: 'rgba(255, 175, 169, 0.8)',
	};

	return (
		<div>
			<div
				className="w-[82vw] h-[17vh] rounded-[30px] shadow-xl flex items-center justify-between px-3 bg-white border-b-4 transition-transform duration-150 ease-in-out transform active:translate-y-1"
				onClick={() => clickDetailBtn()}
			>
				<div className="flex justify-center w-[40%]">
					<img
						src={data.photo || profile}
						onError={e => {
							e.target.src = profile;
						}}
						className="w-20 h-20 rounded-full"
					/>
				</div>
				<div className="flex flex-col items-center flex-1">
					<div className="flex-1 w-full">
						<div className="relative flex justify-center h-full ml-1 w-fit">
							<div
								className="box-content absolute bottom-[1px] w-full h-[10px] px-1 z-1"
								style={{
									backgroundColor: `${type[data.invest_type]}`,
								}}
							/>
							<span className="text-[14px] font-medium z-10">
								{data.invest_type}
							</span>
						</div>
						<div className="flex flex-row items-baseline gap-2">
							<span className="text-[20px] font-bold">{data.name} PB</span>
							<span className="text-[12px] text-[#505050]">
								{data.category_detail}
							</span>
						</div>
						<div className="flex flex-col">
							<span className="text-[15px]">{data.office_name}</span>
							<span className="text-[12px] text-[#707070]">
								내 위치로부터 {data.office_distance.toFixed(2)}km
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
