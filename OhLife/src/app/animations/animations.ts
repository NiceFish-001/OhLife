import {trigger,state,transition, animate, style, query, group } from '@angular/animations';

export const slideToRight = trigger('routerAnimate', [
    //定义void表示空状态下
    state('void', style({ position: 'relative', 'width': '100%', 'height': '100%' })),
    // * 表示任何状态
    state('*', style({ position: 'relative', 'width': '100%', 'height': '100%' })),
    // 进场动画
    transition(':enter', [
        style({ transform: 'translate3d(-100%,0,0)' }),
        animate('.7s ease-in-out', style({ transform: 'translate3d(0,0,0)' }))
    ])
]);