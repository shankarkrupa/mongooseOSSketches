load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_mqtt.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_http.js');

let led = Cfg.get('pins.led');
let button = Cfg.get('pins.button');
let topic = '/devices/' + Cfg.get('device.id') + '/events';

print('LED GPIO:', led, 'button GPIO:', button);

let getInfo = function() {
  return JSON.stringify({
    total_ram: Sys.total_ram(),
    free_ram: Sys.free_ram()
  });
};

// Blink built-in LED every second
GPIO.set_mode(led, GPIO.MODE_OUTPUT);


Timer.set(2000, Timer.REPEAT, function(){
  HTTP.query({
    url: 'http://krupashankar.com/iot/buttonstate.asp',
    success: function(res)
    {
      print("Server response: " + res);
      if(res === "true")
      {
        GPIO.write(led, 1);
      }
      else
      {
        GPIO.write(led, 0);
      }
    }
  });
}, null);

//Timer.set(1000 /* 1 sec */, Timer.REPEAT, function() {
//  let value = GPIO.toggle(led);
//  print(value ? 'Tick' : 'Tock', 'uptime:', Sys.uptime(), getInfo());
//}, null);

// Publish to MQTT topic on a button press. Button is wired to GPIO pin 0
GPIO.set_button_handler(button, GPIO.PULL_UP, GPIO.INT_EDGE_NEG, 200, function() {
  /*let message = getInfo();
  let ok = MQTT.pub(topic, message, 1);
  print('Published:', ok, topic, '->', message);
  */
  
  HTTP.query({
    url: 'http://google.com',
    success: function(res) {
      print('network request done');
      print(res);
    }
  });
  
  let sta = GPIO.toggle(led);
	if(sta)
	{
		print("LED: On");
	}
	else
	{
		print("LED: Off");
	}
}, null);

// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
  }
  print('== Net event:', ev, evs);
}, null);

