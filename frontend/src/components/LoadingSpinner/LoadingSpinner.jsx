import {ClipLoader} from 'react-spinners';

export default function LoadingSpinner({isLoading}){

    return(
        <>
            <ClipLoader isLoading={isLoading} color='var(--primary-content)' size={35} className='spinner' />
        </>
    )
}