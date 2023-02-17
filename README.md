# rn-otp-inputs

<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/rn-otp-inputs">
<img alt="GitHub followers" src="https://img.shields.io/github/followers/jayanta-hub?style=social">

**rn-otp-inputs** is a tiny Javascript library which provides an elegant UI for the end user to input one time passcode (OTP). It handles autocomplete functionality and it display remaining time for OTP. It also features a carefully crafted flow to handle edge cases for volatile user gestures. We provide default UI, but you can always customize the appearance as you like.

## Installation

`npm install --save rn-otp-inputs`

or

`yarn add rn-otp-inputs`

## PeerDependencies

### NOTES:

This packgae will support react@^ 17.0.2, prop-types@^ 15.8.1, react-native@^0.68.2 and upper version.

`npm install --save prop-types@15.8.1 react@17.0.2 react-native@0.68.2`

or

`yarn add prop-types@15.8.1 react@17.0.2 react-native@0.68.2`

## Basic Usage

Android Screen Shot

<kbd> <img height="530" width="230" src="https://user-images.githubusercontent.com/76052991/218087798-ee2b4c26-c603-435b-a90b-8e31279d4cea.png" /> </kbd>
<kbd> <img height="530" width="230" src="https://user-images.githubusercontent.com/76052991/219651758-c45d4748-b96f-4d03-84f5-7f0fd1c138ba.png" /> </kbd>
<kbd> <img height="530" width="230" src="https://user-images.githubusercontent.com/76052991/218086772-28f749d3-8329-494e-8b0c-806310db573a.png" /> </kbd>
<kbd> <img height="530" width="230" src="https://user-images.githubusercontent.com/76052991/219652068-dc5a1e2b-e6f1-4c2b-bdce-7f9a09e20f12.png" /> </kbd>

Ios Screen Shot

<kbd> <img height="500" width="230" src="https://user-images.githubusercontent.com/76052991/218086943-462a99fb-39b1-4ac6-a5e6-1394dbd6c921.png" /> </kbd>
<kbd> <img height="500" width="230" src="https://user-images.githubusercontent.com/76052991/219652235-17e17755-6486-4f35-8611-22ceb32730c9.png" /> </kbd>
<kbd> <img height="500" width="230" src="https://user-images.githubusercontent.com/76052991/218087265-f5e9955a-53fa-40f9-b32a-eb55823e894b.png" /> </kbd>
<kbd> <img height="500" width="230" src="https://user-images.githubusercontent.com/76052991/219652407-3465cbf9-1762-4025-88e4-e9418e02fc72.png" /> </kbd>

```
import RnOtpInputs from 'rn-otp-inputs';

...

<RnOtpInputs  pinCount={4} onSubmit={()=>{}} />
```

## More Advanced Usage

```
import  RnOtpInputs  from  'rn-otp-inputs';

...
const  [value,  setValue]  =  useState('');
...
<RnOtpInputs
  pinCount={4}
  mode='rectangle'
  onSubmit={()=>{}}
  maskText={false}
  autoSubmit={true}
  borderRadius={6}
  borderWidth={1}
  borderColor='#A768F1'
  bgColor='#D9E3F6'
  textColor='#000000'
  onChageValue={setValue}
  keyboardType='number-pad'
  buttonTitle='Verify & Proceed'
  Minute={1}
  Second={0}
  onlyResendOtp={false}
  onResentClick={false}
/>
```

## Parameters

| Parameter           | Required | Type       | Default                                                                          | Description                                                                                                                                                                               |
| ------------------- | -------- | ---------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pinCount            | `Yes`    | `Number`   | `4`                                                                              | Number of digits in the component , range is 4-6.                                                                                                                                         |
| onSubmit            | `Yes`    | `Function` | `()=>{}`                                                                         | Callback when Submit Button is Click.                                                                                                                                                     |
| mode                | `No`     | `String`   | `rectangle`                                                                      | mode can be rectangle, flat or circle.                                                                                                                                                    |
| maskText            | `No`     | `Boolean`  | `false`                                                                          | Hide contents of text fields .                                                                                                                                                            |
| autoSubmit          | `No`     | `Boolean`  | `false`                                                                          | Callback when the digits are filled . `Note :` If value is `true` than we can get `entered value` from `onSubmit`. e.g.` onSubmit={(value)=>{console.log(value)}}`                        |
| borderRadius        | `No`     | `Number`   | `6`                                                                              | Change Border Radius of input field. `Note : `borderRadius will apply when mode is `reactangle`                                                                                           |
| borderColor         | `No`     | `String`   | `#A768F1`                                                                        | Change Border Color of input field.                                                                                                                                                       |
| borderWidth         | `No`     | `Number`   | `1`                                                                              | Change Border Width of input field.                                                                                                                                                       |
| bgColor             | `No`     | `String`   | `#D9E3F6`                                                                        | Change Background Color of input field.                                                                                                                                                   |
| textColor           | `No`     | `String`   | `#000000`                                                                        | Change the style of the input Text.                                                                                                                                                       |
| onChageValue        | `No`     | `Function` | `()=>{}`                                                                         | Callback when the digits are Changed.                                                                                                                                                     |
| keyboardType        | `No`     | `String`   | `number-pad`                                                                     | Keyboard type.                                                                                                                                                                            |
| buttonTitle         | `No`     | `String`   | `Verify & Proceed`                                                               | Button Title .                                                                                                                                                                            |
| Minute              | `No`     | `Number`   | `1`                                                                              | Remaining Time in minute.                                                                                                                                                                 |
| Second              | `No`     | `Number`   | `0`                                                                              | Remaining Time in Second.                                                                                                                                                                 |
| onlyResendOtp       | `No`     | `Boolean`  | `false`                                                                          | If value is `true` Remaining time will not Display, Only Resend Otp Button will display.                                                                                                  |
| onResentClick       | `No`     | `Function` | `()=>{}`                                                                         | Callback when the Resend Button clicked.                                                                                                                                                  |
| buttonStyle         | `No`     | `object`   | `{{flex: 1,height: scale(40)}}`                                                  | Change the style of the Button.                                                                                                                                                           |
| buttonTitleStyle    | `No`     | `object`   | `{{fontSize: scale(15),color: "#FFFFFF"}}`                                       | Change the style of the Button Title.                                                                                                                                                     |
| resendButtonStyle   | `No`     | `object`   | `{{fontSize: scale(15), color: "#404B69"}}`                                      | Change the style of the Resend Button.                                                                                                                                                    |
| inputHeightAndWidth | `No`     | `Number`   | `50`                                                                             | Height and width of input field.                                                                                                                                                          |
| isError             | `No`     | `Boolean`  | `false`                                                                          | To Display Error Message.                                                                                                                                                                 |
| errorMsg            | `No`     | `String`   | `Invalid OTP.`                                                                   | Change the Error Message.                                                                                                                                                                 |
| errorMsgStyle       | `No`     | `object`   | `{{marginLeft: scale(30),marginTop: scale(5),fontSize: scale(12),color: "red"}}` | Change the style of Error Message.                                                                                                                                                        |
| isButtonDisplay     | `No`     | `Boolean`  | `true`                                                                           | If you don't want to use Button, than you have to pass `false` . `NOTE` If the value is `true` and you don't want to use any button for submit , than you have to use `autoSubmit` props. |
| isResendOtpDisplay  | `No`     | `Boolean`  | `true`                                                                           | If you don't want to use Resend OTP Button, than you have to pass `false`.                                                                                                                |

## Contributors

![jayanta7381](https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci81ZWZhZGY0MjdjNzliM2YxZDY0ODcxNzI0NjI2NWQzNz9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.Ujb96nLBkk2Z0K5NilEVjWj-0Kpa6NTFeIV8c5Ip-mQ)

`Jayanta Garu`
