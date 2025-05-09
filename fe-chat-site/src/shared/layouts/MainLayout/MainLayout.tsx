
import { Props } from './types'

const MainLayout = ({ children }: Props) => {
    return (
        <div className='p-25'>
            <div className="">
                {children}
            </div>
        </div>
    )
}

export default MainLayout; 