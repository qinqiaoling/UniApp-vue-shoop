

/**
 * 打开设置页面
 * @param {String} setting 设置页面标识
 *    参考Android原生android.provider.Settings类中定义的常量
 */
function openSetting(setting){
try{
  var os = plus.os.name;
  if('Android' == os){
    var main = plus.android.runtimeMainActivity();
    var intent = plus.android.newObject('android.content.Intent', setting);
    main.startActivity(intent);
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @openSettings!!');
}
}

function openAppSetting(){
try{
  var os = plus.os.name;
  if('Android' == os){
    var main = plus.android.runtimeMainActivity();
    var intent = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
    var uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
    plus.android.invoke(intent, 'setData', uri);
    main.startActivity(intent);
  }else{
    //unsupport, nothing to do.
  }
}catch(e){
  console.error('error @openAppSetting!!');
}
}


module.exports = {
  SETTINGS: 'android.settings.SETTINGS',
  APN_SETTINGS: 'android.settings.APN_SETTINGS',
  LOCATION_SOURCE_SETTINGS: 'android.settings.LOCATION_SOURCE_SETTINGS',
  USER_SETTINGS: 'android.settings.USER_SETTINGS',
  WIRELESS_SETTINGS: 'android.settings.WIRELESS_SETTINGS',
  SECURITY_SETTINGS: 'android.settings.SECURITY_SETTINGS',
  PRIVACY_SETTINGS: 'android.settings.PRIVACY_SETTINGS',
  WIFI_SETTINGS: 'android.settings.WIFI_SETTINGS',
  WIFI_IP_SETTINGS: 'android.settings.WIFI_IP_SETTINGS',
  BLUETOOTH_SETTINGS: 'android.settings.BLUETOOTH_SETTINGS',
  CAST_SETTINGS: 'android.settings.CAST_SETTINGS',
  DATE_SETTINGS: 'android.settings.DATE_SETTINGS',
  SOUND_SETTINGS: 'android.settings.SOUND_SETTINGS',
  DISPLAY_SETTINGS: 'android.settings.DISPLAY_SETTINGS',
  LOCALE_SETTINGS: 'android.settings.LOCALE_SETTINGS',
  VOICE_INPUT_SETTINGS: 'android.settings.VOICE_INPUT_SETTINGS',
  INPUT_METHOD_SETTINGS: 'android.settings.INPUT_METHOD_SETTINGS',
  MANAGE_APPLICATIONS_SETTINGS: 'android.settings.MANAGE_APPLICATIONS_SETTINGS',
  DEVICE_INFO_SETTINGS: 'android.settings.DEVICE_INFO_SETTINGS',
  NOTIFICATION_SETTINGS: 'android.settings.NOTIFICATION_SETTINGS',
  open: openSetting,
  openAppSetting: openAppSetting
}
