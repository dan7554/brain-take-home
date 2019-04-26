export default function breakpoint( pageWidth ) {
    if( !Config.breakpoints ) {
        console.log('Breakpoints are unconfigured')
        return ''
    }
    const bpKeys = Object.keys(Config.breakpoints)
    
    try {

        for( let i = 0; i < bpKeys.length; i++ ) {
            const bp = bpKeys[i]
            const { min, max } = Config.breakpoints[bp]
            if( min <= pageWidth && pageWidth <= max) {
                return bp
            }
        }
    } catch (error) {
        console.log('Something went wrong when calculating breakpoint.', pageWidth, Config.breakpoints, error)
        return ''
    }
    return ''
} 