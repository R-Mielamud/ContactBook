define({ "api": [
  {
    "type": "delete",
    "url": "/api/category/delete",
    "title": "Delete category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "group": "Categories",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"category\": {\n        \"state\": \"deleted\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/category/index.js",
    "groupTitle": "Categories",
    "name": "DeleteApiCategoryDelete"
  },
  {
    "type": "get",
    "url": "/api/category",
    "title": "Get all categories",
    "group": "Categories",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"categories\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/category/index.js",
    "groupTitle": "Categories",
    "name": "GetApiCategory"
  },
  {
    "type": "post",
    "url": "/api/category/register",
    "title": "Add new category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "about",
            "description": ""
          }
        ]
      }
    },
    "group": "Categories",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"category\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/category/index.js",
    "groupTitle": "Categories",
    "name": "PostApiCategoryRegister"
  },
  {
    "type": "put",
    "url": "/api/category/update",
    "title": "Update category",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": ""
          }
        ]
      }
    },
    "group": "Categories",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"category\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/category/index.js",
    "groupTitle": "Categories",
    "name": "PutApiCategoryUpdate"
  },
  {
    "type": "delete",
    "url": "/api/contact/delete",
    "title": "Delete contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contact\": {\n        \"state\": \"deleted\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "DeleteApiContactDelete"
  },
  {
    "type": "get",
    "url": "/api/contact",
    "title": "Get all contacts of logined user. Supports filtering by firstName, lastName, mainEmail, category",
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contacts\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "GetApiContact"
  },
  {
    "type": "get",
    "url": "/api/contact/birthdays",
    "title": "Get coming contact birthdays",
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contacts\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "GetApiContactBirthdays"
  },
  {
    "type": "get",
    "url": "/api/contact/:id",
    "title": "Get contact by id (replace :id in path with real id)",
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contact\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "GetApiContactId"
  },
  {
    "type": "get",
    "url": "/api/contact/min",
    "title": "Get minimum contacts info",
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contacts\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "GetApiContactMin"
  },
  {
    "type": "post",
    "url": "/api/contact/register",
    "title": "Add new contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "who",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "birthDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": true,
            "field": "mainEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Telephone",
            "optional": false,
            "field": "mainTelephone",
            "description": "<p>Telephone is {code: String, value: String}</p>"
          },
          {
            "group": "Parameter",
            "type": "Telephone[]",
            "optional": true,
            "field": "telephones",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email[]",
            "optional": true,
            "field": "emails",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "favorite",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Image",
            "optional": true,
            "field": "photo",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Category",
            "optional": false,
            "field": "category",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Messangers",
            "optional": true,
            "field": "messangers",
            "description": "<p>Messangers is { telegram: [String], viber: [String], whatsapp: [String], facebook: [String], twitter: [String], instagram: [String] }</p>"
          }
        ]
      }
    },
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contact\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "PostApiContactRegister"
  },
  {
    "type": "post",
    "url": "/api/contact/share",
    "title": "Share contact with person",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the contact</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userEmail",
            "description": "<p>Email on which you would like to send a message about sharing</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "PostApiContactShare"
  },
  {
    "type": "put",
    "url": "/api/contact/update",
    "title": "Update contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "who",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "birthDate",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": true,
            "field": "mainEmail",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Telephone",
            "optional": true,
            "field": "mainTelephone",
            "description": "<p>Telephone is {code: String, value: String}</p>"
          },
          {
            "group": "Parameter",
            "type": "Telephone[]",
            "optional": true,
            "field": "telephones",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email[]",
            "optional": true,
            "field": "emails",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "favorite",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Image",
            "optional": true,
            "field": "photo",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Category",
            "optional": true,
            "field": "category",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Messangers",
            "optional": true,
            "field": "messangers",
            "description": "<p>Messangers is { telegram: [String], viber: [String], whatsapp: [String], facebook: [String], twitter: [String], instagram: [String] }</p>"
          }
        ]
      }
    },
    "group": "Contacts",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"contact\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/contact/index.js",
    "groupTitle": "Contacts",
    "name": "PutApiContactUpdate"
  },
  {
    "type": "post",
    "url": "/api/image/register",
    "title": "Add new image",
    "group": "Images",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "MultipartFormDataFile",
            "optional": false,
            "field": "image",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example",
          "content": "{\n    \"success\": true,\n    \"image\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/image/index.js",
    "groupTitle": "Images",
    "name": "PostApiImageRegister"
  },
  {
    "type": "get",
    "url": "/api/user/profile",
    "title": "Get user's profile",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"user\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/user/index.js",
    "groupTitle": "User",
    "name": "GetApiUserProfile"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"token\": \"...\",\n    \"user\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/user/index.js",
    "groupTitle": "User",
    "name": "PostApiUserLogin"
  },
  {
    "type": "post",
    "url": "/api/user/logout",
    "title": "Log out",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"user\": null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/user/index.js",
    "groupTitle": "User",
    "name": "PostApiUserLogout"
  },
  {
    "type": "post",
    "url": "/api/user/register",
    "title": "Register user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"token\": \"...\",\n    \"user\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/user/index.js",
    "groupTitle": "User",
    "name": "PostApiUserRegister"
  },
  {
    "type": "put",
    "url": "/api/user/update",
    "title": "Update user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success example:",
          "content": "{\n    \"success\": true,\n    \"token\": \"...\",\n    \"user\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/user/index.js",
    "groupTitle": "User",
    "name": "PutApiUserUpdate"
  }
] });
