import React from 'react'
import { useSelector } from 'react-redux'
import BaseScreen from '../Components/BaseScreen'

export default function ScreenSettings() {
    const bg_inactive = useSelector( ( state ) => state.colorTheme.fill_inactive )
    return (
        <BaseScreen background={''}>
            <div style={{ backgroundColor: bg_inactive}}>

                <div style={{ border: "black 5px solid" }}>

                </div>
            </div>
        </BaseScreen>
    )
}
// 8225398 -- разница м/у цветами (десятичный результат вычитания fill_active из fill_inactive)