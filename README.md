#Movie And Me (REACT NATIVE TUTORIAL)

##About
This is a simple application to search films from the TDMB API
with the capacity to show details for a film and add it to your favorite list.

##Usage
Run with EXPO

##Resources
[Tutorial From **OPENCLASSROOMS** website](https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native/4902068-decouvrez-le-developpement-mobile-actuel)

##Features 

**v0.2.0**
* Function add to Favorites (using **REDUX**)
* Add favorite page with custom navigation (**TabNavigator**)
- npm install --save redux
- npm install --save react-redux
- npm install --save react-navigation-tabs
- npm install --save react-native-reanimated

**Caution** 
Have to fix some compilation issues whith :
- expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
and
- expo start -c ( -c : to clear cache)

**v0.1.4**
* Add Film Detail Navigation screen with **StackNavigator**

**Take care about library to install**
- npm install --save react-navigation
- npm install --save react-navigation-stack
- npm install --save react-native-gesture-handler
- npm install --save react-native
- npm install --save react-navigation-stack @react-native-community/masked-view
- npm install --save moment
- npm install --save numeral


**v0.1.3**
* Add pagination between results list with infinite loop

**v0.1.2**
* Use keyword from inputtext to process search

**v0.1.1**
* Use keyword from inputtext to process search
* Retrieve film list from API
* Display result with custom CSS
* optimize state use

**v0.1**
* Display a short FLATLIST from data file

