'use client';
import { useGlobalContext } from '@/state/global.context';
import AddressAvatar from './AddressAvatar';

const ConnectButton = () => {
	const { address, loading, connectWallet } = useGlobalContext();

	if (address) return <AddressAvatar address={address} />;
	return (
		<button
			className="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
			onClick={connectWallet}
			disabled={loading}
		>
			{loading ? 'busy...' : 'Connect wallet'}
		</button>
	);
};

export default ConnectButton;
