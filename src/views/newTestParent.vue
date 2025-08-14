<template>
    <div>
        <el-button type="primary" @click="visible = true">预览</el-button>
        <DesignPreview :visible.sync="visible" :designData="designData" />
    </div>
  </template>
  
  <script>
  import DesignPreview from './newTest.vue'
  
  export default {
    components: {
        DesignPreview
    },
    data() {
      return {
        visible: false,
        designData: {
            "children": [
                {
                    "baseImage": {
                        "dimension": {
                            "height": 1600,
                            "width": 1600
                        },
                        "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/5b036b36b66758fbbed3cb74851d5c8f.png"
                    },
                    "children": [
                        {
                            "children": [
                                {
                                    "identifier": '',
                                    "type": "OptionChooserComponent",
                                    "name": "颜色 1",
                                    "instructions": "",
                                    "templateIdentifier": "3988fa5f-7af6-4361-8a28-c7eaeb4cbc91",
                                    "options": [
                                        {
                                            "identifier": '',
                                            "name": "选项 1",
                                            "label": "选项 1",
                                            "additionalCost": {
                                                "amount": 0
                                            }
                                        },
                                        {
                                            "identifier": '',
                                            "name": "选项 2",
                                            "label": "选项 2",
                                            "additionalCost": {
                                                "amount": 7
                                            }
                                        }
                                    ],
                                    "isRequired": true,
                                    "attribute": {
                                        "attributeName": [
                                            "color"
                                        ],
                                        "attributeType": "StringAttributeType"
                                    },
                                    "label": {
                                        "default": "Color",
                                        "stringId": "gestalt-picture-frame-color-option-label-override"
                                    }
                                },
                                {
                                    "key": "option dropdown",
                                    "template_name": "option dropdown",
                                    "name": "Option drop-down list 1",
                                    "identifier": '',
                                    "type": "OptionChooserComponent",
                                    "instructions": "",
                                    "templateIdentifier": "3cfbdca6-dcd7-451f-8480-7f344f3b85a8",
                                    "options": [
                                        {
                                            "identifier": '',
                                            "name": "Option 0",
                                            "label": "Option 0",
                                            "additionalCost": {
                                                "amount": 0
                                            }
                                        },
                                        {
                                            "identifier": '',
                                            "name": "Option 11",
                                            "label": "Option 11",
                                            "additionalCost": {
                                                "amount": 6
                                            },
                                            overlayImage: {
                                                "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/8f14e4f6db5c5883c8bdc1c2125d7d69.jpg",
                                                "dimension": {
                                                    "width": 500,
                                                    "height": 500
                                                }
                                            },
                                            thumbnailImage: {
                                                "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/8f14e4f6db5c5883c8bdc1c2125d7d69.jpg",
                                                "dimension": {
                                                    "width": 500,
                                                    "height": 500
                                                }
                                            }
                                        }
                                    ],
                                    "isRequired": true,
                                    "label": "Label 111"
                                },
                                {
                                    "key": "text",
                                    "label": "text",
                                    "name": "Text 1",
                                    "identifier": '',
                                    "template_name": "TextInput",
                                    "templateIdentifier": "4377cedf-0eb5-4423-b635-ae7d2bfb5f14",
                                    "type": "ContainerComponent",
                                    "children": [
                                        {
                                            "identifier": '',
                                            "type": "FontChooserComponent",
                                            "name": "",
                                            "label": "Text font test",
                                            "instructions": "Text font test instructions",
                                            "template_name": "FontChooser",
                                            "templateIdentifier": "97cf2f29-90ce-43a1-89b7-4f72c52a4b08",
                                            "defaultFontIdentifier": "cgjBsSGj",
                                            "fontOptions": [
                                                {
                                                    "identifier": '',
                                                    "family": "Press Start 2P",
                                                    "fontType": "GoogleFont",
                                                    "isDefault": true
                                                },
                                                {
                                                    "identifier": '',
                                                    "family": "Quimil",
                                                    "files": {
                                                        "truetype": {
                                                            "fileName": "Quimil-Demo-2.ttf",
                                                            "url": "https://m.media-amazon.com/images/S/gestalt-fonts-eu-prod-eu-west-1/custom-fonts/A1F83G8C2ARO7P/A2OOQF2WFCW27L/cfa566cb-6c06-4b01-8efc-a30928e9a19b.ttf"
                                                        }
                                                    },
                                                    "fontType": "CustomFont"
                                                }
                                            ],
                                            "isRequired": false
                                        },
                                        {
                                            "identifier": '',
                                            "type": "ColorChooserComponent",
                                            "name": "",
                                            "label": "Text color test",
                                            "instructions": "Text color test instructions",
                                            "template_name": "ColorChooser",
                                            "templateIdentifier": "375d43cd-557a-4bfd-99a9-6ef29268b83f",
                                            "colorOptions": [
                                                {
                                                    "identifier": "zfRTD2UH",
                                                    "name": "TestColor",
                                                    "value": "#50E3C2",
                                                    "colorModel": "rgb",
                                                    "isDefault": true
                                                },
                                                {
                                                    "identifier": "JOJNCe3H",
                                                    "name": "Black",
                                                    "value": "#000000",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "ChY5v66l",
                                                    "name": "Dark Grey",
                                                    "value": "#545454",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "BC9sffxW",
                                                    "name": "Grey",
                                                    "value": "#737373",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "TCrpiqKL",
                                                    "name": "Light Grey",
                                                    "value": "#d9d9d9",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "l6vZXaWf",
                                                    "name": "White",
                                                    "value": "#ffffff",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "RiXLpcqx",
                                                    "name": "Red",
                                                    "value": "#ff3131",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "1Y4o3G-4",
                                                    "name": "Coral Red",
                                                    "value": "#ff5757",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "6-bnbewG",
                                                    "name": "Pink",
                                                    "value": "#ff66c4",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "KbMlPqUX",
                                                    "name": "Magenta",
                                                    "value": "#cb6ce6",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "3k7dtTtR",
                                                    "name": "Purple",
                                                    "value": "#8c52ff",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "dCQ0CCsa",
                                                    "name": "Violet",
                                                    "value": "#5e17eb",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "-Kv0iZwQ",
                                                    "name": "Turquoise",
                                                    "value": "#0097b2",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "GWbRX-AK",
                                                    "name": "Light Blue",
                                                    "value": "#38b6ff",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "pCIHxWKs",
                                                    "name": "Cobalt Blue",
                                                    "value": "#004aad",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "OuJoKQsK",
                                                    "name": "Navy",
                                                    "value": "#224092",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "YEfwmT8z",
                                                    "name": "Green",
                                                    "value": "#00bf63",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "9Jqe8SeQ",
                                                    "name": "Grass Green",
                                                    "value": "#7ed957",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "7i-aITAo",
                                                    "name": "Yellow",
                                                    "value": "#ffde59",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "SJqVvlKQ",
                                                    "name": "Peach",
                                                    "value": "#ffbd59",
                                                    "colorModel": "rgb"
                                                },
                                                {
                                                    "identifier": "B80eqWNV",
                                                    "name": "Orange",
                                                    "value": "#ff914d",
                                                    "colorModel": "rgb"
                                                }
                                            ],
                                            "defaultColorIdentifier": "zfRTD2UH"
                                        },
                                        {
                                            "identifier": '',
                                            "type": "ContainerComponent",
                                            "templateIdentifier": "0b303c49-5c51-4ba4-ba98-b7e1bed324d6",
                                            "template_name": "Text Blocks",
                                            "children": [
                                                {
                                                    "key": "",
                                                    "identifier": '',
                                                    "template_name": "placement",
                                                    "type": "PlacementContainerComponent",
                                                    "templateIdentifier": "9b4e96a7-9648-4464-9413-7ab3f14ff961",
                                                    "children": [
                                                        {
                                                            "key": "TextInputComponent",
                                                            "identifier": '',
                                                            "type": "FlatRatePriceDeltaContainerComponent",
                                                            "template_name": "FlatRate",
                                                            "templateIdentifier": "54b3d602-9fa1-4bfb-b06d-1de4e3db36ac",
                                                            "priceDelta": {
                                                                "amount": 0
                                                            },
                                                            "children": [
                                                                {
                                                                    "identifier": '',
                                                                    "type": "TextInputComponent",
                                                                    "name": "",
                                                                    "label": "Test the text block",
                                                                    "instructions": "Test text block description",
                                                                    "template_name": "text",
                                                                    "templateIdentifier": "5238aef9-4949-4bc6-92a2-a58bc264faf2",
                                                                    "minLength": 1,
                                                                    "maxLength": 1000,
                                                                    "regexChoice": "3052d23c-90ab-4d30-a117-45624940945b",
                                                                    "isRequired": true,
                                                                    "placeholder": "",
                                                                    "maxLines": 1
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "dimension": {
                                                        "width": 62,
                                                        "height": 44
                                                    },
                                                    "position": {
                                                        "x": 169,
                                                        "y": 107
                                                    },
                                                    "isFreePlacement": true,
                                                    "label": "Text input 1",
                                                    "name": "Text input 1"
                                                },
                                                {
                                                    "key": "",
                                                    "identifier": '',
                                                    "template_name": "placement",
                                                    "type": "PlacementContainerComponent",
                                                    "templateIdentifier": "9b4e96a7-9648-4464-9413-7ab3f14ff961",
                                                    "children": [
                                                        {
                                                            "key": "TextInputComponent",
                                                            "identifier": '',
                                                            "template_name": "FlatRate",
                                                            "type": "FlatRatePriceDeltaContainerComponent",
                                                            "templateIdentifier": "54b3d602-9fa1-4bfb-b06d-1de4e3db36ac",
                                                            "priceDelta": {
                                                                "amount": 0
                                                            },
                                                            "children": [
                                                                {
                                                                    "identifier": '',
                                                                    "type": "TextInputComponent",
                                                                    "name": "",
                                                                    "label": "wenben12313",
                                                                    "instructions": "",
                                                                    "templateIdentifier": "5238aef9-4949-4bc6-92a2-a58bc264faf2",
                                                                    "minLength": 1,
                                                                    "maxLength": 1000,
                                                                    "regexChoice": "3052d23c-90ab-4d30-a117-45624940945b",
                                                                    "isRequired": true,
                                                                    "placeholder": "",
                                                                    "maxLines": 1
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    "dimension": {
                                                        "width": 100,
                                                        "height": 94
                                                    },
                                                    "position": {
                                                        "x": 150,
                                                        "y": 100
                                                    },
                                                    "isFreePlacement": false,
                                                    "label": "Text input 2",
                                                    "name": "Text input 2"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "key": "Data",
                                    "template_name": "Data",
                                    "identifier": '',
                                    "type": "FlatRatePriceDeltaContainerComponent",
                                    "templateIdentifier": "a1bc1846-bf1d-49cb-a119-f47f1812ad1d",
                                    "priceDelta": {
                                        "amount": 0
                                    },
                                    "label": "Data 1",
                                    "name": "Data 1",
                                    "children": [
                                        {
                                            "identifier": '',
                                            "type": "TextInputComponent",
                                            "name": "",
                                            "label": "data234",
                                            "instructions": "data234 instructions",
                                            "templateIdentifier": "a338ef77-0857-40dd-8232-17eeeeba039a",
                                            "minLength": 1,
                                            "maxLength": 1000,
                                            "regexChoice": "1883d0d2-a293-44a7-971b-2fc40388bdb1",
                                            "isRequired": true,
                                            "placeholder": "",
                                            "maxLines": 1
                                        }
                                    ]
                                },
                                {
                                    "key": "Data",
                                    "template_name": "Data",
                                    "identifier": '',
                                    "type": "FlatRatePriceDeltaContainerComponent",
                                    "templateIdentifier": "a1bc1846-bf1d-49cb-a119-f47f1812ad1d",
                                    "priceDelta": {
                                        "amount": 0
                                    },
                                    "label": "Data 2",
                                    "name": "Data 2",
                                    "children": [
                                        {
                                            "identifier": '',
                                            "type": "TextInputComponent",
                                            "name": "",
                                            "label": "data567",
                                            "instructions": "data567 instructions",
                                            "templateIdentifier": "a338ef77-0857-40dd-8232-17eeeeba039a",
                                            "minLength": 1,
                                            "maxLength": 1000,
                                            "regexChoice": "1883d0d2-a293-44a7-971b-2fc40388bdb1",
                                            "isRequired": true,
                                            "placeholder": "",
                                            "maxLines": 1
                                        }
                                    ]
                                },
                                {
                                    "identifier": "",
                                    "type": "OptionChooserComponent",
                                    "name": "Cover Material 1",
                                    "instructions": "",
                                    "templateIdentifier": "10af50e0-fb9e-4300-9bcb-682d3b352021",
                                    "options": [
                                        {
                                        "identifier": "",
                                        "name": "Option 1",
                                        "label": "Option 1",
                                        "additionalCost": {
                                            "amount": 0
                                        }
                                        },
                                        {
                                        "identifier": "",
                                        "name": "Option 2",
                                        "label": "Option 2",
                                        "additionalCost": {
                                            "amount": 0
                                        },
                                        "thumbnailImage": {
                                            "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/81ac126031fdb85c68a74ffdcb906f7a.jpg",
                                            "dimension": {
                                            "width": 500,
                                            "height": 500
                                            }
                                        },
                                        "overlayImage": {
                                            "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/81ac126031fdb85c68a74ffdcb906f7a.jpg",
                                            "dimension": {
                                            "width": 500,
                                            "height": 500
                                            }
                                        }
                                        }
                                    ],
                                    "isRequired": true,
                                    "attribute": {
                                        "attributeName": [
                                        "cover",
                                        "material"
                                        ],
                                        "attributeType": "StringAttributeType"
                                    },
                                    "label": {
                                        "default": "Cover Material",
                                        "stringId": "gestalt-picture-frame-cover-material-option-label-override"
                                    }
                                    },
                                {
                                    "key": "image",
                                    "template_name": "image",
                                    "identifier": '',
                                    "templateIdentifier": "932308d6-f9d3-441d-bf2d-967f1f61459e",
                                    "type": "PlacementContainerComponent",
                                    "dimension": {
                                        "width": 106,
                                        "height": 82
                                    },
                                    "position": {
                                        "x": 77,
                                        "y": 113
                                    },
                                    "isFreePlacement": true,
                                    "label": "Pic 1",
                                    "name": "Pic 1",
                                    "children": [
                                        {
                                            "identifier": '',
                                            "type": "ImageInputComponent",
                                            "name": "",
                                            "label": "Image 555",
                                            "instructions": "Image instructions",
                                            "templateIdentifier": "cb585042-7e79-469e-be05-90ef7afe1390",
                                            "isRequired": true,
                                            "minResolution": {
                                                "width": 100,
                                                "height": 90
                                            }
                                        }
                                    ],
                                    "minResolution": {
                                        "width": 90,
                                        "height": 90
                                    }
                                },
                                {
                                    "key": "image",
                                    "template_name": "image",
                                    "identifier": '',
                                    "templateIdentifier": "932308d6-f9d3-441d-bf2d-967f1f61459e",
                                    "type": "PlacementContainerComponent",
                                    "dimension": {
                                        "width": 106,
                                        "height": 82
                                    },
                                    "position": {
                                        "x": 100,
                                        "y": 150
                                    },
                                    "isFreePlacement": true,
                                    "label": "Pic 2",
                                    "name": "Pic 2",
                                    "children": [
                                        {
                                            "identifier": '',
                                            "type": "ImageInputComponent",
                                            "name": "",
                                            "label": "Image 666",
                                            "instructions": "Image instructions",
                                            "templateIdentifier": "cb585042-7e79-469e-be05-90ef7afe1390",
                                            "isRequired": true,
                                            "minResolution": {
                                                "width": 100,
                                                "height": 90
                                            }
                                        }
                                    ],
                                    "minResolution": {
                                        "width": 90,
                                        "height": 90
                                    }
                                }
                            ],
                            "identifier": '',
                            "templateIdentifier": "f47a8017-2c05-4610-a2a5-1440d531da59",
                            "type": "FlatContainerComponent",
                            "conditionalDisplayRules": [
                                {
                                    "dependentId": "YU7TXon5",
                                    "matcher": {
                                        "componentIdentifier": "zd253rd9",
                                        "choiceIds": [
                                            "6VdAgvbo"
                                        ],
                                        "matcherType": "ChoiceMatcher"
                                    }
                                },
                                {
                                    "dependentId": "e1grU4gV",
                                    "matcher": {
                                        "componentIdentifier": "zd253rd9",
                                        "choiceIds": [
                                            "6VdAgvbo"
                                        ],
                                        "matcherType": "ChoiceMatcher"
                                    }
                                }
                            ]
                        }
                    ],
                    "identifier": '',
                    "instructions": "",
                    "label": "Test 21321",
                    "maskImage": {
                        "dimension": {
                            "height": 1600,
                            "width": 1600
                        },
                        "imageUrl": "https://m.media-amazon.com/images/S/gestalt-seller-images-prod-eu-west-1/A1F83G8C2ARO7P/A2OOQF2WFCW27L/60b0a34f546da59c6914f559be03ae2b.png"
                    },
                    "name": "Test surface 1",
                    "templateIdentifier": "49d279f6-88b7-46f9-b7f6-9484755768e3",
                    "type": "PreviewContainerComponent"
                }
            ],
            "templateIdentifier": "d8b7c539-cfc2-486b-b331-16712cb18a4f",
            "type": "PageContainerComponent",
            "identifier": '',
        }
      }
    },
    methods: {
        
    }
  }
  </script>
  