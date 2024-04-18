// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// const composeHOCs = (...funcs) =>
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     funcs.reduce(
//         (a, b) =>
//             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//             // @ts-ignore
//             (...args) =>
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                 // @ts-ignore
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
//                 a(
//                     // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
//                     b(...args)
//                 ),
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//         (arg) => arg
//     );
//
// export default composeHOCs;

import { ComponentClass, ComponentType } from "react";
const composeHOCs = function(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any {
    return funcs.reduce(
        (a, b) =>
            (...args) =>
                a(b(...args)),
        (arg) => arg
    );
};

export default composeHOCs;
