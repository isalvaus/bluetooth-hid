mouse.startMouseService()
media.startMediaService()


enum Service{
    mouse,
    volume,
    media,
}

bluetooth.onBluetoothConnected(()=>{
    basic.showIcon(IconNames.Yes)
})

//Iniciar maquina de estados
let state:Service = Service.mouse
basic.showString("M")

//Cambiar estado
input.onLogoEvent(TouchButtonEvent.Pressed, () =>{
    state == (state + 1) % 3
    basic.showString(state.toString().charAt(0))
})

let angle = 500

basic.forever(() => {

        // Mouse
    if (Math.abs(input.acceleration(Dimension.X)) > angle && Math.abs(input.acceleration(Dimension.Y)) > angle ){
            mouse.movexy(1, 1)
            basic.showArrow(2)
        }
        else if (Math.abs(input.acceleration(Dimension.X)) > angle){
            mouse.movexy(1, 0)
            basic.showArrow(0)
        }
        else if (Math.abs(input.acceleration(Dimension.Y)) > angle){
            mouse.movexy(0, 1)
            basic.showArrow(1)
        }

})



//  keys

input.onButtonPressed(Button.A,()=>{
    switch (state) {
        // Mouse Click
        case Service.mouse:
        mouse.click()
        basic.showString("Click")

        break

        // Previous
        case Service.media:
        media.sendCode(MediaKey.previous)
        basic.showArrow(0)

        break

        //Volumen
        case Service.volume:
        media.sendCode(MediaKey.vol_down)

        break
    }
})

input.onButtonPressed(Button.B, () => {
    switch (state) {
        // Mouse Click Derecho
        case Service.mouse:
            mouse.rightClick()
            basic.showString("Right Click")
            break

        // Next
        case Service.media:
            media.sendCode(MediaKey.next)
            basic.showArrow(1)
            break

        case Service.volume:
            media.sendCode(MediaKey.vol_up)

    }

})
