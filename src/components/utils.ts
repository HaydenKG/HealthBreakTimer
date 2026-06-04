export function setTabTitle(text: string){
    let title = "Healthbreak timer"
    if(text.length > 0) title = `${text} - ${title}`
    document.title = title
}

export function clearTabTitle(){
    setTabTitle("")
}