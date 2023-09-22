import { Link } from "react-router-dom"



export default function Account() {

    let subpage='profile'

    function linkClasses(type = null) {
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
            classes += ' bg-primary text-white';
        } else {
            classes += ' bg-gray-200';
        }
        return classes;
    }
    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                My profile
            </Link>
            <Link className={linkClasses('order')}>
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                    <path d="M20 4h-16v-2h16v2zm0 4h-16v-2h16v2zm-16 14h16v-2h-16v2zm13.746-14c.958 0 1.754.672 1.941 1.581l1.313 8.419h-17l1.313-8.419c.187-.909.983-1.581 1.941-1.581h10.492zm-8.246 10h6v2h-6v-2zm2-8h2v2h-2v-2zm0 4h2v2h-2v-2zm-6 12h18v2h-18v-2z" />
                </svg>

                My order
            </Link>
            
        </nav>
    )
}