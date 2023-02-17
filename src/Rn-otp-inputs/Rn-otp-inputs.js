import {
  View,
  TextInput,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {guidelineBaseWidth, scale} from '../Infrastructure/utils/screenUtility';
const RnOtpInputs = props => {
  const {
    onSubmit,
    secureTextEntry,
    autoSubmit,
    mode,
    borderRadiusStyle,
    onChageValue,
    bgcolor,
    textColor,
    borderWidth,
    borderColor,
    keyboardType,
    buttonTitle,
    Minute,
    Second,
    buttonStyle,
    onlyResendOtp,
    onResentClick,
    buttonTitleStyle,
    resendTextStyle,
    inputHeightAndWidth,
    isError,
    errorMsgStyle,
    errorMsg,
    isButtonDisplay,
    isResendOtpDisplay,
  } = props;
  const inputRef = useRef();
  const [otp, setOtp] = useState(
    new Array(
      props.pinCount && props.pinCount <= 6 && props.pinCount >= 3
        ? props.pinCount
        : 4,
    ).fill(''),
  );
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [minute, setMinute] = useState(Minute);
  const [second, setSecond] = useState(Second);
  const [isResend, setIsResend] = useState(false);
  const [iserror, setIserror] = useState('');
  const [shakeAnimation, setShakeAnimation] = useState(new Animated.Value(0));
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const ResendHandler = () => {
    setOtp(
      new Array(
        props.pinCount && props.pinCount <= 6 && props.pinCount >= 3
          ? props.pinCount
          : 4,
      ).fill(''),
    ),
      setIserror(false),
      setActiveOtpIndex(0),
      setIsResend(true),
      onResentClick();
  };
  const ChangeHandler = (e, index) => {
    const {text} = e.nativeEvent;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    e.nativeEvent?.text
      ? setActiveOtpIndex(index + 1)
      : index > 0
      ? setActiveOtpIndex(index - 1)
      : null;
    // isError ? setIserror(false) : null;
    /**
     * ? For AutoSubmit (After Fill All Input we Can call a Fun)
     */
    onChageValue(newOtp.join('').toString());
    autoSubmit
      ? activeOtpIndex === props.pinCount - 1
        ? onSubmit(newOtp.join('').toString())
        : null
      : null;
  };
  const OnKeyHandler = (e, index) => {
    /**
     * ? When Enter BackSpace
     */
    e.nativeEvent.key === 'Backspace' && index > 0
      ? (setActiveOtpIndex(index - 1), setIserror(false))
      : null;
  };

  /**
   * ? For Error hanlder
   */

  useEffect(() => {
    setIserror(isError);
    isError ? startShake() : null;
  }, [isError]);

  /**
   * ? For Dynamic Array
   */
  useEffect(() => {
    setOtp(
      new Array(
        props.pinCount && props.pinCount <= 6 && props.pinCount >= 3
          ? props.pinCount
          : 4,
      ).fill(''),
    );
  }, [props.pinCount]);

  /**
   * ? For Focus on each box
   */

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  /**
   * ? For Timer
   */

  useEffect(() => {
    isResend ? (setSecond(Second), setMinute(Minute)) : null;
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
        setIsResend(false);
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(interval);
          setIsResend(false);
        } else {
          setSecond(59);
          setMinute(minute - 1);
          setIsResend(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [second, isResend]);
  return (
    <>
      <SafeAreaView>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <View style={styles.containerWrap}>
              {otp.map((item, index) => {
                return (
                  <Animated.View
                    key={index}
                    style={{
                      borderBottomWidth: iserror
                        ? borderWidth
                        : mode === 'flat'
                        ? 1
                        : activeOtpIndex === index
                        ? borderWidth
                        : 0,
                      borderWidth: scale(
                        iserror
                          ? borderWidth
                          : mode === 'flat'
                          ? 0
                          : activeOtpIndex === index
                          ? borderWidth
                          : 0,
                      ),
                      borderRadius: scale(
                        mode === 'circle'
                          ? 50
                          : mode === 'flat'
                          ? 0
                          : mode === 'rectangle'
                          ? borderRadiusStyle
                          : borderRadiusStyle,
                      ),
                      backgroundColor: mode === 'flat' ? '#FFFFFF' : bgcolor,
                      marginHorizontal:
                        Platform.isPad || guidelineBaseWidth > 500
                          ? scale(40)
                          : scale(0),
                      marginTop:
                        Platform.isPad || guidelineBaseWidth > 500
                          ? scale(20)
                          : scale(0),

                      padding: scale(0.5),
                      borderColor: iserror ? 'red' : borderColor,
                      transform: [{translateX: shakeAnimation}],
                    }}>
                    <TextInput
                      key={index}
                      ref={index === activeOtpIndex ? inputRef : null}
                      autoCorrect={false}
                      value={otp[index]}
                      maxLength={1}
                      keyboardType={keyboardType}
                      editable={true}
                      onChange={e => ChangeHandler(e, index)}
                      onKeyPress={e => OnKeyHandler(e, index)}
                      secureTextEntry={secureTextEntry}
                      style={{
                        height: scale(
                          props.pinCount === 4 && props.pinCount < 7
                            ? inputHeightAndWidth
                              ? inputHeightAndWidth
                              : 50
                            : props.pinCount === 5 && props.pinCount < 7
                            ? inputHeightAndWidth
                              ? inputHeightAndWidth
                              : 55
                            : props.pinCount === 6 && props.pinCount < 7
                            ? inputHeightAndWidth
                              ? inputHeightAndWidth
                              : 45
                            : 50,
                        ),
                        width: scale(
                          props.pinCount === 4 && props.pinCount < 7
                            ? props.inputHeightAndWidth
                              ? props.inputHeightAndWidth
                              : 50
                            : props.pinCount === 5 && props.pinCount < 7
                            ? props.inputHeightAndWidth
                              ? props.inputHeightAndWidth
                              : 55
                            : props.pinCount === 6 && props.pinCount < 7
                            ? props.inputHeightAndWidth
                              ? props.inputHeightAndWidth
                              : 45
                            : 50,
                        ),
                        textAlign: 'center',
                        fontSize: scale(22),
                        fontWeight: '500',
                        color: textColor,
                        borderRadius: scale(
                          mode === 'circle'
                            ? 50
                            : mode === 'flat'
                            ? 0
                            : mode === 'rectangle'
                            ? borderRadiusStyle
                            : borderRadiusStyle,
                        ),
                        backgroundColor: mode === 'flat' ? '#FFFFFF' : bgcolor,
                        paddingBottom: 0,
                        paddingTop: 0,
                      }}
                    />
                  </Animated.View>
                );
              })}
            </View>
            {iserror ? <Text style={errorMsgStyle}>{errorMsg}</Text> : null}
            {isResendOtpDisplay ? (
              <View
                style={{
                  ...styles.containerWrap,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={ResendHandler}
                  disabled={
                    onlyResendOtp
                      ? false
                      : minute === 0 && second === 0
                      ? false
                      : true
                  }
                  style={{
                    opacity: onlyResendOtp
                      ? 1
                      : minute === 0 && second === 0
                      ? 1
                      : 0.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: scale(20),
                  }}>
                  <Text style={resendTextStyle}>
                    Resend OPT
                    {minute === 0 &&
                    second === 0 ? null : onlyResendOtp ? null : (
                      <Text style={resendTextStyle}>
                        {' '}
                        in{' '}
                        {minute !== 0
                          ? `${minute}:${second} sec`
                          : ` ${second} sec`}
                      </Text>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {isButtonDisplay ? (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: scale(10),
                  marginHorizontal: scale(30),
                }}>
                <TouchableOpacity
                  onPress={onSubmit}
                  disabled={activeOtpIndex === props.pinCount ? false : true}
                  style={{
                    ...buttonStyle,
                    opacity: activeOtpIndex === props.pinCount ? 1 : 0.5,
                  }}>
                  <Text style={buttonTitleStyle}>{buttonTitle}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

RnOtpInputs.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pinCount: PropTypes.number.isRequired,
  secureTextEntry: PropTypes.bool,
  autoSubmit: PropTypes.bool,
  mode: PropTypes.string,
  onChageValue: PropTypes.func,
  bgcolor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  keyboardType: PropTypes.string,
  borderWidth: PropTypes.number,
  buttonTitle: PropTypes.string,
  Minute: PropTypes.number,
  Second: PropTypes.number,
  borderRadiusStyle: PropTypes.number,
  buttonStyle: PropTypes.object,
  onlyResendOtp: PropTypes.bool,
  onResentClick: PropTypes.func,
  buttonTitleStyle: PropTypes.object,
  resendTextStyle: PropTypes.object,
  isError: PropTypes.bool,
  errorMsgStyle: PropTypes.object,
  errorMsg: PropTypes.string,
  isButtonDisplay: PropTypes.bool,
  isResendOtpDisplay: PropTypes.bool,
};

RnOtpInputs.defaultProps = {
  /**
   * ? not required, this prop mentioned as required in propTypes
   */
  // pinCount: 0,
  secureTextEntry: false,
  autoSubmit: false,
  mode: 'rectangle',
  bgcolor: '#D9E3F6',
  textColor: '#000000',
  borderWidth: 1,
  borderRadiusStyle: 6,
  borderColor: '#A768F1',
  keyboardType: 'number-pad',
  buttonTitle: 'Verify & Proceed',
  Minute: 1,
  Second: 0,
  onChageValue: () => {},
  onSubmit: e => {},
  buttonStyle: {
    flex: 1,
    backgroundColor: '#349beb',
    height: scale(40),
    fontSize: scale(8),
    borderColor: '',
    borderRadius: scale(6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(10),
    marginBottom: scale(0),
    marginLeft: scale(0),
    marginHorizontal: scale(0),
    marginVertical: scale(0),
  },
  onlyResendOtp: false,
  onResentClick: () => {},
  buttonTitleStyle: {
    fontSize: scale(15),
    color: '#FFFFFF',
  },
  resendTextStyle: {
    fontSize: scale(15),
    color: '#404B69',
  },
  isError: false,
  errorMsgStyle: {
    marginLeft: scale(30),
    marginTop: scale(5),
    fontSize: scale(12),
    color: 'red',
  },
  errorMsg: 'Invalid OTP.',
  isButtonDisplay: true,
  isResendOtpDisplay: true,
};
export default RnOtpInputs;

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(10),
  },
  containerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(10),
    marginHorizontal: scale(30),
    flexWrap: 'wrap',
  },
});
