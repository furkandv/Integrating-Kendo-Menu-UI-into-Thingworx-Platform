TW.IDE.Widgets.dvmkendomenu = function () {
	this.MAX_SERIES = 16;

	this.widgetIconUrl = function () {
		return "'../Common/extensions/dvmKendoMenu/ui/dvmkendomenu/default_widget_icon.ide.png'";
	};
	this.widgetProperties = function () {
		var properties = {

			'name': 'dvmkendomenu',
			'description': '',
			'category': ['Common'],
			'properties': {
				'CustomClass': {
					'baseType': 'STRING',
					'isLocalizable': false,
					'isBindingSource': true,
					'isBindingTarget': true,
					'isVisible': false
				},

				'Data': {
					'isBindingTarget': true,
					'isEditable': true,
					'baseType': "INFOTABLE",
					'warnIfNotBoundAsTarget': true,
					'isLocalizable': true
				},
				'ColumnFormat': {
					'isVisible': false,
					'baseType': 'STRING'
				},
				'CustomItemNames': {
					'description': "",
					'baseType': 'STRING',
					'isLocalizable': true

				},
				'Style': {
					'baseType': 'STYLEDEFINITION',
					'defaultValue': 'kendoTest',
					'description': ''
				},
				'SubMenuStyle': {
					'baseType': 'STYLEDEFINITION',
					'defaultValue': '',
					'description': 'kendoMenuSubStyle'
				},
				'ChangeCurrentMenuOrientation': {
					'description': "",
					'baseType': 'BOOLEAN',
					'defaultValue': false

				},
				'ChangeHoverDelay': {
					'description': "",
					'baseType': 'NUMBER',
					'defaultValue': 100
				},
				'OpenOnClickRootMenuItems': {
					'description': "",
					'baseType': 'BOOLEAN',
					'defaultValue': false

				},
				'OpenOnClickSubMenuItems': {
					'description': "",
					'baseType': 'BOOLEAN',
					'defaultValue': false

				},
				'CloseOnClickMenuItems': {
					'description': "",
					'baseType': 'BOOLEAN',
					'defaultValue': false

				}
			}
		}

		return properties;

	};

	this.afterAddBindingSource = function (bindingInfo) {
		if (bindingInfo['targetProperty'] === 'Data') {

		}
	};

	this.afterSetProperty = function (name, value) {
		var thisWidget = this;
		var refreshHtml = false;
		switch (name) {
			case 'Style':
			case 'dvmkendomenu Property':
				thisWidget.jqElement.find('.dvmkendomenu-property').text(value);
			case 'Alignment':
				refreshHtml = true;
				break;
			default:
				break;
		}
		return refreshHtml;
	};

	this.renderHtml = function () {
		// return any HTML you want rendered for your widget
		// If you want it to change depending on properties that the user
		// has set, you can use this.getProperty(propertyName).
		return '<div class="widget-content widget-dvmkendomenu">' +
			'<span class="dvmkendomenu-property">' + this.getProperty('dvmkendomenu Property') + '</span>' +
			'</div>';
	};

	this.afterRender = function () {
		// NOTE: this.jqElement is the jquery reference to your html dom element
		// 		 that was returned in renderHtml()

		// get a reference to the value element
		valueElem = this.jqElement.find('.dvmkendomenu-property');
		// update that DOM element based on the property value that the user set
		// in the mashup builder
		valueElem.text(this.getProperty('dvmkendomenu Property'));
	};

};