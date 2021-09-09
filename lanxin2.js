const chavy = init()

sign()

function sign() {
  let url = {
    url: `https://attendanceserviceapi.pactera.com:8099/LanXin/zh-cn/GPS/AttendanceCheckIn`,
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-cn',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': 'AttendanceLoginInfo={"EmployeeNo":"P0153164","Token":"O6dzVQDOgIw2wfsASANdHglIsWo="}; __RequestVerificationToken_L0xhblhpbg2=duAaQO6j99Cb_KyYRWhN-U9qVBfSgMdlDyN1AyJSw9w_DLtI-RXXawl6nTenz0DpItJC_A1r9mHnLVArYLihK4BCYQRj4uoF9pNTbeEN_HJY97kzy5cirdQUdd4dGS7h7vbLo771jMtJ6wP9rdW4PA2; App_Token=e2417621-4fc3-498a-ac54-9d928d2b1ce5; User_Token=f0ec03a2-1992-48e5-8c19-d04efa4ee197; currentuser=P0153164',
      'Host': 'attendanceserviceapi.pactera.com:8099',
      'Origin': 'https://attendanceserviceapi.pactera.com:8099',
      'Referer': 'https://attendanceserviceapi.pactera.com:8099/LanXin/zh-cn/GPS/Index',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 es360messenger/7.22.30-796 clientType/phone',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  url.body = {
    'longitude':112.879524,
    'latitude':28.22987,
    '__RequestVerificationToken':'A5KIjFg47HhO5GS7UUzuha3lIaXFKYjf4jr5IJaO9ilLHvrqIyC5XashQv6P-Vl1JGAA1mRdKHyPUEJtlEZylwmskS8dfhgWtj0JIUiwlcVNiGk1Xji2pRoWe6CRIAFgrPw_-E_7HFa7rI1giC1n1t8OokkI84136FCsMR5jd0s1'
  }
  chavy.post(url, (error, response, data) => {
    let result = JSON.parse(data)
    // 签到成功
    if (result && result.IsCheckInSuccess == 1) {
      let subTitle = `签到结果: 成功`
      chavy.msg(`蓝信签到`, subTitle)
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      chavy.msg(`蓝信签到`, subTitle)
    }
    chavy.log(`${cookieName}, data: ${data}`)
    chavy.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
