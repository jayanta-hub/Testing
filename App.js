import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from './src/Infrastructure/utils/screenUtility';
import RnOtpInputs from 'rn-otp-inputs';
const App = () => {
  const [iserror, setIserror] = useState(false);
  const submitHanlder = () => {
    setIserror(!iserror);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <RnOtpInputs
        pinCount={4}
        onSubmit={submitHanlder}
        isError={iserror}
        Minute={0}
        Second={5}
        autoSubmit={true}
        // secureTextEntry={true}
        // isResendOtpDisplay={false}
        // isButtonDisplay={false}
        errorMsgStyle={{
          marginLeft: scale(30),
          marginTop: scale(5),
          fontSize: scale(12),
          color: 'red',
          // alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default App;
