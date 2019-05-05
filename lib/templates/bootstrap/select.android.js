var React = require("react");
var { View, Text, Picker ,TextInput} = require("react-native");
import ModalFilterPicker from 'react-native-modal-filter-picker'
import PickerModal from 'react-native-picker-modal-view';
function select(locals) {
  if (locals.hidden) {
    return null;
  }
  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    stylesheet.select.normal,
    stylesheet.pickerContainer.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;
  
  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label}</Text>
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  
  // locals.options = locals.options.splice(0,1);
  let opt = [];
  for (let i = 0; i < locals.options.length; i++) {
    if (i!==0) {
      let ele = locals.options[i];
      opt.push(ele);
    }
  }
  locals.options = opt;
  var options = locals.options.map(({ value, text }) => (
    <Picker.Item key={value} value={value} label={text} />
  ));
  var items = locals.options.map(({ value, text }) => (
    { "Name": text, "Value": value, "Code": value, "Id": value }  
  ));
  var requiredLabelStyle = stylesheet.requiredLabel.normal;
   var requiredLabel = locals.requiredLabel ? (
    <Text style={requiredLabelStyle}>{locals.requiredLabel}</Text>
  ) : null;
  selected = (selected) => {
    locals.onChange(selected.Value)
  }
  close = () => {
  }
  onBackRequest = () => {
    console.log("back key pressed");
  }
  getSelect = (value) => {
    var items = locals.options.map(({ value, text }) => (
       { "Name": text, "Value": value, "Code": value, "Id": value }  
    ));
    let select = {};
    for (let index = 0; index < items.length; index++) {
      var ele = items[index];
      if (ele.Value === value) {
        select =  ele;
      }
      
    }
    console.log(value);
    console.log(items);
    console.log(select);
    return select;
  }
  getItems = ()=>{
     var items = locals.options.map(({ value, text }) => (
      { "Name": text, "Value": value, "Code": value, "Id": value }  
    ));
    return items;
  }
  return (
    <View style={formGroupStyle}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        {label}{requiredLabel}
      </View>
      {/**
      <Picker
        accessibilityLabel={locals.label}
        ref="input"
        style={selectStyle}
        selectedValue={locals.value}
        onValueChange={locals.onChange}
        help={locals.help}
        enabled={!locals.disabled}
        mode={locals.mode}
        prompt={locals.prompt}
        itemStyle={locals.itemStyle}
      >
        {options}
      </Picker>
        */}
      <PickerModal
      //onSelected={(selected) => this.selected(selected)}	
      //onSelected={value => locals.onChange(value)}
      onSelected ={this.selected.bind(this)}
			onClosed={this.close.bind(this)}
			onBackButtonPressed={this.onBackRequest.bind(this)}
      items={this.getItems()}
      disabled={locals.disabled}
			sortingLanguage={'tr'}
			showToTopButton={true}
			selected={this.getSelect(locals.value)}
			autoGenerateAlphabeticalIndex={true}
			selectPlaceholderText={locals.label}
			onEndReached={() => console.log('list ended...')}
			searchPlaceholderText={'请输入关键字...'}
			requireSelection={false}
      autoSort={false}
      // style={{borderBottomColor: "#f5f5f5",color:"red"}}
      FlatListProps={{viewabilityConfig:{viewAreaCoveragePercentThreshold:50 }}}
      // ModalProps={{}}
			/>
      {/**
      <ModalFilterPicker
          visible={!locals.disabled}
          onSelect={this.onSelect}
          onCancel={this.onCancel}
          options={locals.options}
        />
         */}
      {help}
      {error}
    </View>
  );
}

module.exports = select;
