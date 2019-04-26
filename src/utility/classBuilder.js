export default function classBuilder( baseClass, classMaps ) {
    let classes = ''
    try {
        if (typeof classMaps === Object) {
            console.error('Bad classMap type', typeof classMaps)
            console.trace()
            return ''
        }
        if (typeof baseClass === String) {
            console.error('Bad baseClass type', typeof baseClass)
            console.trace()
            return ''
        }
        classes = baseClass
        const classNames = Object.keys(classMaps)

        for(let i = 0; i < classNames.length; i++) {
            let space = ''
            let className = classNames[i]
            let classMapCondition =  classMaps[className]

            if (classes !== '') {
                space = ' '
            }
            classes += classMapCondition ? (space + className) : ''
        }
    } catch (er) {
        console.error('Something went wrong when mapping classes', er)
        return ''
    }

    return classes
} 