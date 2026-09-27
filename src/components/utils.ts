export function setTabTitle(text: string){
    let title = "Healthbreak timer"
    if(text.length > 0) title = `${text} - ${title}`
    document.title = title
}

export function clearTabTitle(){
    setTabTitle("")
}

// use vite's asset handling instead of building path manually with import.meta.env.BASE_URL
export const WORK_DONE_SOUND = `./sounds/Instrument.wav`;
export const NOTIFICATION_SOUND = `./sounds/ShadowSoft.wav`;