import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faCircleExclamation, faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

//TODO Make the button a new component with props for (field name, field status, field link)

function AnalysisBox() {
    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            <h1>Field Analysis</h1>
            <button className='rounded-xl p-4 bg-red-800 flex flex-row gap-2 items-center min-w-full' onClick={() => window.location.href = "/field"} >
                <FontAwesomeIcon className='text-red-500' icon={faCircleExclamation} size="2x"/>
                <p className='text-white'>Field 3</p>
            </button>
            <button className='rounded-xl p-4 bg-yellow-600 flex flex-row gap-2 items-center min-w-full' onClick={() => window.location.href = "/field"}>
                <FontAwesomeIcon className='text-yellow-500' icon={faTriangleExclamation} size="2x"/>
                <p className='text-white'>Field 2</p>
            </button>
            <button className='rounded-xl p-4 bg-green-800 flex flex-row gap-2 items-center min-w-full' onClick={() => window.location.href = "/field"}>
                <FontAwesomeIcon className='text-green-500' icon={faSquareCheck} size="2x"/>
                <p className='text-white'>Field 1</p>
            </button>
        </div>
    )
} 

export default AnalysisBox