import { ReactNode, useState } from "react"

type InfoHelpProps = {
    children: ReactNode
}

export default function InfoHelp({ children } : InfoHelpProps) {
    const [seeMore, setSeeMore] = useState(false)

    return (
        <div className='container-bg-white mt-1'>
            <div className={`info-limit ${seeMore && 'show'}`}>
                {children}
            </div>

            <button className='text-primary font-bold mt-1' onClick={() => setSeeMore(!seeMore)}>
                {seeMore ? 'Ver menos...' : 'Ver más...'}
            </button>
        </div>
    )
}
