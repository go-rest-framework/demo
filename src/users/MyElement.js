import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function MyElement(props) {
    const myref = React.createRef();

    const trigger = useScrollTrigger();
    if (trigger) {
        console.log(trigger);
    }

    React.useEffect(() => {
        //const handleScroll = () => {
        //console.log(window.innerHeight);
        //console.log(myref.current.getBoundingClientRect());
        ////if (wait) {
        ////if (throttleTimeout === null) {
        ////throttleTimeout = setTimeout(callBack, wait)
        ////}
        ////} else {
        ////callBack()
        ////}
        //}
        //

        document.body.onscroll = function() {
            console.log(window.innerHeight);
            console.log(myref.current.getBoundingClientRect());
        }

        //window.addEventListener('scroll', handleScroll)

        //return () => window.removeEventListener('scroll', handleScroll)
    });

    return (
        <div ref={myref}>test test test</div>
    );
}
