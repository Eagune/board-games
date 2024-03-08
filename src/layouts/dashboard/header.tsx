import Logo from '@/components/logo';

export default function Header() {
    return (
        <header className="flex bg-black pl-5 h-20">
            <div className='relative flex h-20 items-center justify-center py-4'>
                <Logo />
            </div>
            <div className="flex flex-grow items-center justify-between">
            </div>
        </header>
    )
}
