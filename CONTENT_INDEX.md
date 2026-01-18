# Content Index

This document provides an inventory of all content types and components in the Strapi project.

# Content Types

## Footer

```json
{
  "kind": "singleType",
  "collectionName": "footers",
  "info": {
    "singularName": "footer",
    "pluralName": "footers",
    "displayName": "Footer",
    "description": ""
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "sections": {
      "type": "component",
      "repeatable": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "component": "elements.footer-item"
    },
    "links": {
      "type": "component",
      "repeatable": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "component": "utilities.link"
    },
    "copyRight": {
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "type": "string"
    },
    "logoImage": {
      "type": "component",
      "repeatable": false,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "component": "utilities.image-with-link"
    }
  }
}
```

## Page

```json
{
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": ""
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "type": "string",
      "required": true
    },
    "breadcrumbTitle": {
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "type": "string"
    },
    "slug": {
      "type": "string",
      "required": true,
      "regex": "^[a-z0-9/-]+$",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "fullPath": {
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "type": "string",
      "required": false,
      "unique": true
    },
    "content": {
      "type": "dynamiczone",
      "components": [
        "sections.image-with-cta-button",
        "sections.horizontal-images",
        "sections.hero",
        "sections.heading-with-cta-button",
        "sections.faq",
        "sections.carousel",
        "sections.animated-logo-row",
        "forms.newsletter-form",
        "forms.contact-form",
        "utilities.ck-editor-content"
      ],
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "children": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::page.page",
      "mappedBy": "parent"
    },
    "parent": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::page.page",
      "inversedBy": "children"
    },
    "seo": {
      "type": "component",
      "repeatable": false,
      "component": "seo-utilities.seo",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "redirects": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::redirect.redirect",
      "mappedBy": "page"
    }
  }
}
```

## Promo

```json
{
  "kind": "collectionType",
  "collectionName": "promos",
  "info": {
    "singularName": "promo",
    "pluralName": "promos",
    "displayName": "Promo",
    "description": "Promotional content for nonprofit, BIPOC, events, and community partners"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "kind": {
      "type": "enumeration",
      "enum": ["nonprofit", "bipoc", "snacks", "event"],
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "audio": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["audio"],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "start": {
      "type": "datetime",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "end": {
      "type": "datetime",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "description": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    }
  }
}
```

## Navbar

```json
{
  "kind": "singleType",
  "collectionName": "navbars",
  "info": {
    "singularName": "navbar",
    "pluralName": "navbars",
    "displayName": "Navbar",
    "description": ""
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "links": {
      "type": "component",
      "repeatable": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "component": "utilities.link"
    },
    "logoImage": {
      "type": "component",
      "repeatable": false,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      },
      "component": "utilities.image-with-link"
    }
  }
}
```

## Merchant

```json
{
  "kind": "collectionType",
  "collectionName": "merchants",
  "info": {
    "singularName": "merchant",
    "pluralName": "merchants",
    "displayName": "Merchant",
    "description": "Local business partners and sponsors"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "zip": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "category": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "couponText": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "audio": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["audio"],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "featured": {
      "type": "boolean",
      "default": false,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  }
}
```

## Track

```json
{
  "kind": "collectionType",
  "collectionName": "tracks",
  "info": {
    "singularName": "track",
    "pluralName": "tracks",
    "displayName": "Track",
    "description": "Music tracks and songs"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "artist": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "isLocal": {
      "type": "boolean",
      "default": false,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "bin": {
      "type": "enumeration",
      "enum": ["A", "B", "C", "D", "L"],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "localeHint": {
      "type": "enumeration",
      "enum": ["en", "es"],
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "album": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "year": {
      "type": "integer",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  }
}
```

## Redirect

```json
{
  "kind": "collectionType",
  "collectionName": "redirects",
  "info": {
    "singularName": "redirect",
    "pluralName": "redirects",
    "displayName": "Redirect"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "source": {
      "type": "string",
      "required": true
    },
    "destination": {
      "type": "string",
      "required": true
    },
    "permanent": {
      "type": "boolean",
      "default": false
    },
    "page": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::page.page",
      "inversedBy": "redirects"
    }
  }
}
```

## Subscriber

```json
{
  "kind": "collectionType",
  "collectionName": "subscribers",
  "info": {
    "singularName": "subscriber",
    "pluralName": "subscribers",
    "displayName": "Subscriber"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string"
    },
    "email": {
      "type": "email"
    },
    "message": {
      "type": "text"
    }
  }
}
```

## Show

```json
{
  "kind": "collectionType",
  "collectionName": "shows",
  "info": {
    "singularName": "show",
    "pluralName": "shows",
    "displayName": "Show",
    "description": "Radio shows and programs"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "slug": {
      "type": "string",
      "required": true,
      "unique": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "clockRef": {
      "type": "string",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "locales": {
      "type": "json",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "description": {
      "type": "richtext",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    }
  }
}
```

## InternalJob

```json
{
  "kind": "collectionType",
  "collectionName": "internal_jobs",
  "info": {
    "singularName": "internal-job",
    "pluralName": "internal-jobs",
    "displayName": "InternalJob"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "jobType": {
      "type": "enumeration",
      "enum": ["RECALCULATE_FULLPATH", "CREATE_REDIRECT"],
      "required": true
    },
    "relatedDocumentId": {
      "type": "string",
      "required": false
    },
    "payload": {
      "type": "json",
      "required": true
    },
    "state": {
      "type": "enumeration",
      "enum": ["pending", "completed", "failed"],
      "required": true,
      "default": "pending"
    },
    "error": {
      "type": "string"
    }
  }
}
```

# Components

## Link

```json
{
  "collectionName": "components_utilities_links",
  "info": {
    "displayName": "Link",
    "icon": "link",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "url": {
      "type": "string"
    },
    "target": {
      "type": "enumeration",
      "enum": ["_self", "_blank"],
      "default": "_self",
      "required": true
    },
    "page": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::page.page"
    }
  }
}
```

## ImageWithLink

```json
{
  "collectionName": "components_utilities_image_with_links",
  "info": {
    "displayName": "ImageWithLink",
    "description": ""
  },
  "options": {},
  "attributes": {
    "image": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.basic-image",
      "required": true
    },
    "link": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.link"
    }
  }
}
```

## Accordions

```json
{
  "collectionName": "components_utilities_accordions",
  "info": {
    "displayName": "Accordions"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "content": {
      "type": "customField",
      "options": {
        "preset": "defaultCkEditor"
      },
      "customField": "plugin::ckeditor5.CKEditor"
    }
  }
}
```

## CkEditorContent

```json
{
  "collectionName": "components_utilities_ck_editor_contents",
  "info": {
    "displayName": "CkEditorContent"
  },
  "options": {},
  "attributes": {
    "content": {
      "type": "customField",
      "options": {
        "preset": "defaultCkEditor"
      },
      "customField": "plugin::ckeditor5.CKEditor"
    }
  }
}
```

## LinksWithTitle

```json
{
  "collectionName": "components_utilities_links_with_titles",
  "info": {
    "displayName": "LinksWithTitle"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "links": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.link"
    }
  }
}
```

## BasicImage

```json
{
  "collectionName": "components_utilities_basic_images",
  "info": {
    "displayName": "BasicImage"
  },
  "options": {},
  "attributes": {
    "media": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images", "videos"]
    },
    "alt": {
      "type": "string",
      "required": true
    },
    "width": {
      "type": "integer"
    },
    "height": {
      "type": "integer"
    },
    "fallbackSrc": {
      "type": "string"
    }
  }
}
```

## Text

```json
{
  "collectionName": "components_utilities_texts",
  "info": {
    "displayName": "Text"
  },
  "options": {},
  "attributes": {
    "text": {
      "type": "string"
    }
  }
}
```

## metaSocial

```json
{
  "collectionName": "components_seo_utilities_meta_socials",
  "info": {
    "displayName": "metaSocial",
    "icon": "project-diagram"
  },
  "options": {},
  "attributes": {
    "socialNetwork": {
      "type": "enumeration",
      "enum": ["Facebook", "Twitter"],
      "required": true
    },
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 60
    },
    "description": {
      "type": "string",
      "maxLength": 65,
      "required": true
    },
    "image": {
      "allowedTypes": ["images", "files", "videos"],
      "type": "media",
      "multiple": false
    }
  }
}
```

## SocialIcons

```json
{
  "collectionName": "components_seo_utilities_social_icons",
  "info": {
    "displayName": "SocialIcons"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "socials": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.image-with-link"
    }
  }
}
```

## seo

```json
{
  "collectionName": "components_seo_utilities_seos",
  "info": {
    "displayName": "seo",
    "icon": "search",
    "description": ""
  },
  "options": {},
  "attributes": {
    "metaTitle": {
      "required": false,
      "type": "string",
      "maxLength": 60
    },
    "metaDescription": {
      "type": "string",
      "required": false,
      "maxLength": 160
    },
    "metaImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "keywords": {
      "type": "text",
      "regex": "[^,]+"
    },
    "twitter": {
      "type": "component",
      "repeatable": false,
      "component": "seo-utilities.seo-twitter"
    },
    "og": {
      "type": "component",
      "repeatable": false,
      "component": "seo-utilities.seo-og"
    },
    "applicationName": {
      "type": "string"
    },
    "siteName": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "canonicalUrl": {
      "type": "string"
    },
    "metaRobots": {
      "type": "enumeration",
      "enum": [
        "all",
        "index",
        "index,follow",
        "noindex",
        "noindex,follow",
        "noindex,nofollow",
        "none",
        "noarchive",
        "nosnippet",
        "max-snippet"
      ],
      "default": "all"
    },
    "structuredData": {
      "type": "json"
    }
  }
}
```

## SeoOg

```json
{
  "collectionName": "components_seo_utilities_seo_ogs",
  "info": {
    "displayName": "SeoOg",
    "icon": "oneToMany"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "url": {
      "type": "string"
    },
    "type": {
      "type": "enumeration",
      "enum": ["website", "article"],
      "default": "website"
    },
    "image": {
      "allowedTypes": ["images"],
      "type": "media",
      "multiple": false
    }
  }
}
```

## SeoTwitter

```json
{
  "collectionName": "components_seo_utilities_seo_twitters",
  "info": {
    "displayName": "SeoTwitter",
    "icon": "oneToMany"
  },
  "options": {},
  "attributes": {
    "card": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "siteId": {
      "type": "string"
    },
    "creator": {
      "type": "string"
    },
    "creatorId": {
      "type": "string"
    },
    "images": {
      "allowedTypes": ["images"],
      "type": "media",
      "multiple": true
    }
  }
}
```

## Newsletter

```json
{
  "collectionName": "components_forms_newsletter_forms",
  "info": {
    "displayName": "Newsletter"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "gdpr": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.link"
    }
  }
}
```

## ContactForm

```json
{
  "collectionName": "components_forms_contact_forms",
  "info": {
    "displayName": "ContactForm"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string"
    },
    "description": {
      "type": "text"
    },
    "gdpr": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.link"
    }
  }
}
```

## AnimatedLogoRow

```json
{
  "collectionName": "components_sections_animated_logo_rows",
  "info": {
    "displayName": "AnimatedLogoRow",
    "description": ""
  },
  "options": {},
  "attributes": {
    "text": {
      "type": "string",
      "required": true
    },
    "logos": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.basic-image"
    }
  }
}
```

## Hero

```json
{
  "collectionName": "components_sections_heroes",
  "info": {
    "displayName": "Hero",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subTitle": {
      "type": "string"
    },
    "links": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.link"
    },
    "image": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.basic-image"
    },
    "bgColor": {
      "type": "customField",
      "regex": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
      "customField": "plugin::color-picker.color"
    },
    "steps": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.text"
    }
  }
}
```

## Carousel

```json
{
  "collectionName": "components_sections_carousels",
  "info": {
    "displayName": "Carousel",
    "description": ""
  },
  "options": {},
  "attributes": {
    "images": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.image-with-link"
    },
    "radius": {
      "type": "enumeration",
      "enum": ["sm", "md", "lg", "xl", "full"]
    }
  }
}
```

## Faq

```json
{
  "collectionName": "components_sections_faqs",
  "info": {
    "displayName": "Faq",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subTitle": {
      "type": "string"
    },
    "accordions": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.accordions"
    }
  }
}
```

## ImageWithCTAButton

```json
{
  "collectionName": "components_sections_image_with_cta_buttons",
  "info": {
    "displayName": "ImageWithCTAButton",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subText": {
      "type": "string"
    },
    "image": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.basic-image"
    },
    "link": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.link"
    }
  }
}
```

## HeadingWithCTAButton

```json
{
  "collectionName": "components_sections_heading_with_cta_buttons",
  "info": {
    "displayName": "HeadingWithCTAButton",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "subText": {
      "type": "string"
    },
    "cta": {
      "type": "component",
      "repeatable": false,
      "component": "utilities.link"
    }
  }
}
```

## HorizontalImages

```json
{
  "collectionName": "components_sections_horizontal_images",
  "info": {
    "displayName": "HorizontalImages",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "images": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.image-with-link"
    },
    "spacing": {
      "type": "integer",
      "min": 0,
      "max": 20
    },
    "imageRadius": {
      "type": "enumeration",
      "enum": ["sm", "md", "lg", "xl", "full"]
    },
    "fixedImageHeight": {
      "type": "integer"
    },
    "fixedImageWidth": {
      "type": "integer"
    }
  }
}
```

## FooterItem

```json
{
  "collectionName": "components_elements_footer_items",
  "info": {
    "displayName": "FooterItem",
    "description": ""
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "links": {
      "type": "component",
      "repeatable": true,
      "component": "utilities.link"
    }
  }
}
```
