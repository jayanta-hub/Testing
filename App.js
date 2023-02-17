import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import RnOtpInputs from './src/Rn-otp-inputs/Rn-otp-inputs';
import {scale} from './src/Infrastructure/utils/screenUtility';

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
        autoSubmit={false}
        // secureTextEntry={true}
        isResendOtpDisplay={false}
        isButtonDisplay={false}
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
