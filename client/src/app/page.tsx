'use client';
import Button from '@/components/Button';
import { useGlobalContext } from '@/state/global.context';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Home() {
	const { contract, address } = useGlobalContext();

	const startGame = async () => {
		const trans = await contract?.fund('c', {
			value: ethers.parseEther('10'),
		});
		const resp = await trans.wait();
		console.log('data', resp, ' - ', trans);
	};

	useEffect(() => {
		contract?.on('StartGame', (args) => {
			console.log('args', args);
		});
	}, [contract]);

	return (
		<main className="flex min-h-[90vh] flex-col items-center justify-between p-24">
			<Button onClick={startGame}>Fund</Button>
		</main>
	);
}
