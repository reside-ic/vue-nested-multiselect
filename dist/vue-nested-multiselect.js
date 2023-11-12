import { defineComponent as g, ref as k, provide as N, h as d, Transition as ue, withDirectives as oe, inject as L, watch as K, onBeforeMount as Zn, onMounted as Ue, onUpdated as Qn, toRefs as qn, cloneVNode as ea, computed as Me, vShow as pe, Teleport as vn, onBeforeUnmount as ta, resolveComponent as z, openBlock as F, createElementBlock as ye, Fragment as it, createElementVNode as ke, createVNode as W, withCtx as ie, normalizeStyle as na, withModifiers as Ae, createCommentVNode as et, toDisplayString as ot, createBlock as Oe, renderList as St, createTextVNode as aa } from "vue";
function ra(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const a in r)
        if (a !== "default" && !(a in e)) {
          const i = Object.getOwnPropertyDescriptor(r, a);
          i && Object.defineProperty(e, a, i.get ? i : {
            enumerable: !0,
            get: () => r[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
g({
  name: "CAccordion",
  props: {
    /**
     * The active item key.
     */
    activeItemKey: [Number, String],
    /**
     * Make accordion items stay open when another item is opened
     */
    alwaysOpen: Boolean,
    /**
     * Removes the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.
     */
    flush: Boolean
  },
  setup(e, { slots: t }) {
    const n = k(e.activeItemKey), r = (a) => {
      n.value = a;
    };
    return N("activeItemKey", n), N("alwaysOpen", e.alwaysOpen), N("setActiveItemKey", r), () => d("div", { class: ["accordion", { "accordion-flush": e.flush }] }, t.default && t.default());
  }
});
const hn = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t && n.beforeEnter(e);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && r && (t ? (r.beforeEnter(e), r.enter(e)) : r.leave(e, () => {
    }));
  }
}, Yt = (e) => {
  typeof e == "function" && e();
}, Y = (e, t, n = !0) => {
  if (!n) {
    Yt(e);
    return;
  }
  const r = 5, a = ia(t) + r;
  let i = !1;
  const o = ({ target: l }) => {
    l === t && (i = !0, t.removeEventListener("transitionend", o), Yt(e));
  };
  t.addEventListener("transitionend", o), setTimeout(() => {
    i || oa(t);
  }, a);
}, ia = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), a = Number.parseFloat(n);
  return !r && !a ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * 1e3);
}, oa = (e) => {
  e.dispatchEvent(new Event("transitionend"));
}, la = g({
  name: "CCollapse",
  props: {
    /**
     * Set horizontal collapsing to transition the width instead of height.
     */
    horizontal: Boolean,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(!1), a = k(e.visible), i = () => {
      r.value = !0;
    }, o = (f, h) => {
      n("show"), setTimeout(() => {
        if (Y(() => h(), f), e.horizontal) {
          f.style.width = `${f.scrollWidth}px`;
          return;
        }
        f.style.height = `${f.scrollHeight}px`;
      }, 1);
    }, l = (f) => {
      a.value = !0, r.value = !1, e.horizontal ? f.style.removeProperty("width") : f.style.removeProperty("height");
    }, s = (f) => {
      if (r.value = !0, a.value = !1, e.horizontal) {
        f.style.width = `${f.scrollWidth}px`;
        return;
      }
      f.style.height = `${f.scrollHeight}px`;
    }, c = (f, h) => {
      n("hide"), setTimeout(() => {
        if (Y(() => h(), f), e.horizontal) {
          f.style.width = "0px";
          return;
        }
        f.style.height = "0px";
      }, 1);
    }, u = (f) => {
      r.value = !1, e.horizontal ? f.style.removeProperty("width") : f.style.removeProperty("height");
    };
    return () => d(ue, {
      css: !1,
      onBeforeEnter: () => i(),
      onEnter: (f, h) => o(f, h),
      onAfterEnter: (f) => l(f),
      onBeforeLeave: (f) => s(f),
      onLeave: (f, h) => c(f, h),
      onAfterLeave: (f) => u(f)
    }, () => oe(d("div", {
      class: [
        r.value ? "collapsing" : "collapse",
        { "collapse-horizontal": e.horizontal, show: a.value }
      ]
    }, t.default && t.default()), [[hn, e.visible]]));
  }
});
g({
  name: "CAccordionBody",
  setup(e, { slots: t }) {
    const n = L("visible");
    return () => d(la, { class: "accordion-collapse", visible: n.value }, {
      default: () => d("div", { class: ["accordion-body"] }, t.default && t.default())
    });
  }
});
const sa = g({
  name: "CAccordionButton",
  setup(e, { slots: t }) {
    const n = L("toggleVisibility"), r = L("visible");
    return () => d("button", {
      type: "button",
      "aria-expanded": !r.value,
      class: ["accordion-button", { collapsed: !r.value }],
      onClick: () => n()
    }, t.default && t.default());
  }
});
g({
  name: "CAccordionHeader",
  setup(e, { slots: t }) {
    return () => d("div", { class: ["accordion-header"] }, d(sa, {}, {
      default: () => t.default && t.default()
    }));
  }
});
g({
  name: "CAccordionItem",
  props: {
    /**
     * The item key.
     */
    itemKey: [Number, String]
  },
  setup(e, { slots: t }) {
    const n = L("activeItemKey"), r = L("alwaysOpen"), a = L("setActiveItemKey"), i = k(e.itemKey ?? Math.random().toString(36).slice(2, 11)), o = k(n.value === i.value);
    K(n, () => o.value = n.value === i.value);
    const l = () => {
      o.value = !o.value, !r && o && a(i.value);
    };
    return N("visible", o), N("toggleVisibility", l), () => d("div", { class: ["accordion-item"] }, t.default && t.default());
  }
});
const tt = g({
  name: "CCloseButton",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(e, { emit: t }) {
    const n = () => {
      e.disabled || t("click");
    };
    return () => d("button", {
      type: "button",
      class: [
        "btn",
        "btn-close",
        {
          "btn-close-white": e.white
        },
        e.disabled
      ],
      "aria-label": "Close",
      disabled: e.disabled,
      onClick: n
    });
  }
}), lt = {
  type: String,
  validator: (e) => [
    "rounded",
    "rounded-top",
    "rounded-end",
    "rounded-bottom",
    "rounded-start",
    "rounded-circle",
    "rounded-pill",
    "rounded-0",
    "rounded-1",
    "rounded-2",
    "rounded-3"
  ].includes(e)
}, E = {
  type: String,
  validator: (e) => [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
    "link",
    "transparent"
  ].includes(e)
}, kt = {
  type: String,
  validator: (e) => [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "dark",
    "light",
    "white",
    "muted",
    "high-emphasis",
    "medium-emphasis",
    "disabled",
    "high-emphasis-inverse",
    "medium-emphasis-inverse",
    "disabled-inverse"
  ].includes(e)
};
g({
  name: "CAlert",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Optionally add a close button to alert and allow it to self dismisss.
     */
    dismissible: Boolean,
    /**
     * Set the alert variant to a solid.
     *
     * @values 'solid'
     */
    variant: {
      type: String,
      validator: (e) => e === "solid"
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: {
      type: Boolean,
      default: !0
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(e.visible);
    K(() => e.visible, () => {
      r.value = e.visible;
    });
    const a = () => {
      r.value = !1, n("close");
    };
    return () => d(ue, {
      enterFromClass: "",
      enterActiveClass: "fade",
      enterToClass: "fade show",
      leaveActiveClass: "fade"
    }, {
      default: () => r.value && d("div", {
        class: [
          "alert",
          e.variant === "solid" ? `bg-${e.color} text-white border-0` : `alert-${e.color}`,
          {
            [`alert-${e.color}`]: e.color,
            "alert-dismissible": e.dismissible
          }
        ]
      }, [
        t.default && t.default(),
        e.dismissible && d(tt, {
          onClick: () => {
            a();
          }
        })
      ])
    });
  }
});
g({
  name: "CAlertHeading",
  props: {
    /**
     * 	Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h4"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: "alert-heading"
    }, t);
  }
});
g({
  name: "CAlertLink",
  setup(e, { slots: t }) {
    return () => d("a", {
      class: "alert-link"
    }, t);
  }
});
g({
  name: "CAvatar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: lt,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'md', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "md", "lg", "xl"].includes(e)
    },
    /**
     * The src attribute for the img element.
     */
    src: String,
    /**
     * Sets the color context of the status indicator to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    status: {
      type: String,
      validator: (e) => [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light"
      ].includes(e)
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: kt
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "avatar",
        {
          [`bg-${e.color}`]: e.color,
          [`avatar-${e.size}`]: e.size,
          [`text-${e.textColor}`]: e.textColor
        },
        `${e.shape}`
      ]
    }, [
      e.src ? d("img", { src: e.src, class: "avatar-img" }) : t.default && t.default(),
      e.status && d("span", { class: ["avatar-status", `bg-${e.status}`] })
    ]);
  }
});
const Ot = g({
  name: "CBackdrop",
  props: {
    /**
     * Toggle the visibility of modal component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return () => d(ue, {
      onEnter: (t) => {
        t.classList.add("show");
      },
      onLeave: (t) => {
        t.classList.remove("show");
      }
    }, () => e.visible && d("div", {
      class: "fade"
    }));
  }
});
g({
  name: "CBadge",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Position badge in one of the corners of a link or button.
     *
     * @values 'top-start', 'top-end', 'bottom-end', 'bottom-start'
     */
    position: {
      type: String,
      validator: (e) => ["top-start", "top-end", "bottom-end", "bottom-start"].includes(e)
    },
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: lt,
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (e) => e === "sm"
    },
    /**
     * Sets the text color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: kt
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        "badge",
        {
          [`bg-${e.color}`]: e.color,
          "position-absolute translate-middle": e.position,
          "top-0": e.position && e.position.includes("top"),
          "top-100": e.position && e.position.includes("bottom"),
          "start-100": e.position && e.position.includes("end"),
          "start-0": e.position && e.position.includes("start"),
          [`badge-${e.size}`]: e.size,
          [`text-${e.textColor}`]: e.textColor
        },
        e.shape
      ]
    }, t.default && t.default());
  }
});
g({
  name: "CBreadcrumbItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * The `href` attribute for the inner link component.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => d("li", {
      class: [
        "breadcrumb-item",
        {
          active: e.active
        }
      ],
      ...e.active && { "aria-current": "page" }
    }, e.href ? d("a", { href: e.href }, t.default && t.default()) : t.default && t.default());
  }
});
g({
  name: "CBreadcrumb",
  setup(e, { slots: t, attrs: n }) {
    return () => d("nav", {
      "aria-label": "breadcrumb"
    }, d("ol", { class: ["breadcrumb", n.class] }, t.default && t.default()));
  }
});
const st = g({
  name: "CButton",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String,
    /**
     * Select the shape of the component.
     *
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: lt,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Specifies the type of button. Always specify the type attribute for the `<button>` element.
     * Different browsers may use different default types for the `<button>` element.
     *
     * @values 'button', 'submit', 'reset'
     */
    type: {
      type: String,
      default: "button",
      validator: (e) => ["button", "submit", "reset"].includes(e)
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    }
  },
  emits: [
    /**
     * Event called when the user clicks on the button.
     */
    "click"
  ],
  setup(e, { emit: t, slots: n }) {
    const r = (a) => {
      e.disabled || t("click", a);
    };
    return () => d(e.component, {
      class: [
        "btn",
        e.variant ? `btn-${e.variant}-${e.color}` : `btn-${e.color}`,
        {
          [`btn-${e.size}`]: e.size,
          active: e.active,
          disabled: e.disabled
        },
        e.shape
      ],
      disabled: e.disabled && e.component !== "a",
      ...e.component === "a" && e.disabled && { "aria-disabled": !0, tabIndex: -1 },
      ...e.component === "a" && e.href && { href: e.href },
      ...e.component === "button" && { type: e.type },
      onClick: r
    }, n.default && n.default());
  }
});
g({
  name: "CButtonToolbar",
  setup(e, { slots: t }) {
    return () => d("div", { class: "btn-toolbar" }, t.default && t.default());
  }
});
g({
  name: "CButtonGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Create a set of buttons that appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
     */
    vertical: Boolean
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        e.vertical ? "btn-group-vertical" : "btn-group",
        { [`btn-group-${e.size}`]: e.size }
      ]
    }, t.default && t.default());
  }
});
g({
  name: "CCallout",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "callout",
        {
          [`callout-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
});
const ze = g({
  name: "CCard",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Sets the text color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'white', 'muted', 'high-emphasis', 'medium-emphasis', 'disabled', 'high-emphasis-inverse', 'medium-emphasis-inverse', 'disabled-inverse'
     */
    textColor: kt
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "card",
        {
          [`bg-${e.color}`]: e.color,
          [`text-${e.textColor}`]: e.textColor
        }
      ]
    }, t.default && t.default());
  }
}), He = g({
  name: "CCardBody",
  setup(e, { slots: t }) {
    return () => d("div", { class: "card-body" }, t.default && t.default());
  }
}), ca = g({
  name: "CCardFooter",
  setup(e, { slots: t }) {
    return () => d("div", { class: "card-footer" }, t.default && t.default());
  }
});
g({
  name: "CCardGroup",
  setup(e, { slots: t }) {
    return () => d("div", { class: "card-group" }, t.default && t.default());
  }
});
const da = g({
  name: "CCardHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "card-header" }, t.default && t.default());
  }
});
g({
  name: "CCardImage",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "img"
    },
    /**
     * Optionally orientate the image to the top, bottom.
     *
     * @values 'top', 'bottom'
     */
    orientation: {
      type: String,
      validator: (e) => ["top", "bottom"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: `card-img${e.orientation ? `-${e.orientation}` : ""}`
    }, t.default && t.default());
  }
});
g({
  name: "CCardImageOverlay",
  setup(e, { slots: t }) {
    return () => d("div", { class: "card-img-overlay" }, t.default && t.default());
  }
});
const ct = g({
  name: "CLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  emits: [
    /**
     * Event called when the user clicks on the component.
     */
    "click"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = () => {
      n("click", e.href);
    };
    return () => d(e.component, {
      class: [{ active: e.active, disabled: e.disabled }],
      ...e.active && { "aria-current": "page" },
      ...e.component === "a" && e.disabled && { "aria-disabled": !0, tabIndex: -1 },
      ...(e.component === "a" || e.component === "button") && {
        onClick: r
      },
      href: e.href
    }, t.default && t.default());
  }
});
g({
  name: "CCardLink",
  props: {
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: {
      type: String,
      default: "#"
    }
  },
  setup(e, { slots: t }) {
    return () => d(ct, { class: "card-link", href: e.href }, { default: () => t.default && t.default() });
  }
});
g({
  name: "CCardSubtitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "card-subtitle" }, t.default && t.default());
  }
});
g({
  name: "CCardText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "p"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "card-text" }, t.default && t.default());
  }
});
g({
  name: "CCardTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "card-title" }, t.default && t.default());
  }
});
const gt = (e) => typeof document < "u" && document.documentElement.dir === "rtl" ? !0 : e ? e.closest('[dir="rtl"]') !== null : !1, mn = (e, t) => {
  switch (e) {
    case "right":
      return gt(t) ? "left" : "right";
    case "left":
      return gt(t) ? "right" : "left";
    default:
      return e;
  }
}, Se = (e) => {
  const t = e.getBoundingClientRect();
  return Math.floor(t.top) >= 0 && Math.floor(t.left) >= 0 && Math.floor(t.bottom) <= (window.innerHeight || document.documentElement.clientHeight) && Math.floor(t.right) <= (window.innerWidth || document.documentElement.clientWidth);
};
g({
  name: "CCarousel",
  props: {
    /**
     * Adding in the previous and next controls.
     */
    controls: Boolean,
    /**
     * Add darker controls, indicators, and captions.
     */
    dark: Boolean,
    /**
     * index of the active item.
     */
    index: {
      type: Number,
      default: 0
    },
    /**
     * Adding indicators at the bottom of the carousel for each item.
     */
    indicators: Boolean,
    /**
     * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
     */
    interval: {
      type: [Boolean, Number],
      default: 5e3
    },
    /**
     * If set to 'hover', pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won't pause it.
     */
    pause: {
      type: [Boolean, String],
      default: "hover",
      validator: (e) => typeof e == "boolean" || e === "hover"
    },
    /**
     * Set type of the transition.
     *
     * @values 'crossfade', 'slide'
     */
    transition: {
      type: String,
      default: "slide",
      validator: (e) => ["crossfade", "slide"].includes(e)
    },
    /**
     * Set whether the carousel should cycle continuously or have hard stops.
     */
    wrap: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { slots: t }) {
    const n = k(), r = k(e.index), a = k(!1), i = k(e.interval), o = k("next"), l = k([]), s = k(), c = k(), u = (x) => {
      a.value = x;
    }, f = (x) => {
      i.value = x;
    };
    N("setAnimating", u), N("setCustomInterval", f);
    const h = () => s.value && clearInterval(s.value), v = () => {
      h(), typeof e.interval == "number" && (s.value = setTimeout(() => p(), typeof i.value == "number" ? i.value : e.interval));
    }, y = (x) => {
      a.value || (o.value = x, x === "next" ? r.value === l.value.length - 1 ? r.value = 0 : r.value++ : r.value === 0 ? r.value = l.value.length - 1 : r.value--);
    }, p = () => {
      !document.hidden && n.value && Se(n.value) && y("next");
    }, m = (x) => {
      if (r.value !== x) {
        if (r.value < x) {
          o.value = "next", r.value = x;
          return;
        }
        r.value > x && (o.value = "prev", r.value = x);
      }
    }, b = () => {
      c.value = !!(!document.hidden && n.value && Se(n.value));
    };
    return Zn(() => {
      if (t.default) {
        const x = typeof t.default()[0].type == "symbol" ? t.default()[0].children : t.default();
        x && Array.isArray(x) && (l.value = x.filter((j) => j.type.name === "CCarouselItem"));
      }
    }), Ue(() => {
      window.addEventListener("scroll", b);
    }), Qn(() => {
      K(a, () => {
        if (e.wrap) {
          !a.value && v();
          return;
        }
        !e.wrap && r.value < l.value.length - 1 && !a.value && v();
      });
    }), K(c, () => {
      c.value && v();
    }), () => d("div", {
      class: [
        "carousel slide",
        e.transition === "crossfade" && "carousel-fade",
        e.dark && "carousel-dark"
      ],
      onmouseover: () => e.pause && h(),
      onmouseleave: () => v(),
      ref: n
    }, [
      e.indicators && d("div", {
        class: "carousel-indicators"
      }, l.value.map((x, j) => d("button", {
        type: "button",
        id: j,
        "data-coreui-target": "",
        ...r.value === j && { class: "active" },
        onClick: () => m(j)
      }))),
      d("div", { class: "carousel-inner" }, l.value.map((x, j) => d(x, {
        active: r.value === j,
        direction: o.value
      }))),
      e.controls && [
        d("button", {
          type: "button",
          class: "carousel-control-prev",
          "data-coreui-target": "",
          onClick: () => y("prev")
        }, [
          d("span", { class: "carousel-control-prev-icon", ariaHidden: "true" }),
          d("span", { class: "visually-hidden" }, "Previous")
        ]),
        d("button", {
          type: "button",
          class: "carousel-control-next",
          "data-coreui-target": "",
          onClick: () => y("next")
        }, [
          d("span", { class: "carousel-control-next-icon", ariaHidden: "true" }),
          d("span", { class: "visually-hidden" }, "Next")
        ])
      ]
    ]);
  }
});
g({
  name: "CCarouselCaption",
  setup(e, { slots: t }) {
    return () => d("div", {
      class: "carousel-caption"
    }, t.default && t.default());
  }
});
g({
  name: "CCarouselItem",
  props: {
    /**
     * @ignore
     */
    active: {
      type: Boolean,
      default: !1
    },
    /**
     * @ignore
     */
    direction: {
      type: String,
      default: "next"
    },
    /**
     * The amount of time to delay between automatically cycling an item.
     */
    interval: {
      type: [Boolean, Number],
      default: !1
    }
  },
  setup(e, { slots: t }) {
    const n = k(), { active: r } = qn(e), a = k(), i = k(), o = k(r.value && "active"), l = L("setAnimating"), s = L("setCustomInterval");
    return K(r, (c, u) => {
      c && s(e.interval), !u && c && (i.value = `carousel-item-${e.direction}`, s(e.interval)), setTimeout(() => {
        u && !c && (o.value = "active"), a.value = `carousel-item-${e.direction === "next" ? "start" : "end"}`;
      }, 0), n.value.addEventListener("transitionstart", () => {
        l(!0);
      }), n.value.addEventListener("transitionend", () => {
        l(!1), c && (a.value = "", i.value = "", o.value = "active"), c || (a.value = "", i.value = "", o.value = "");
      });
    }), () => d("div", {
      class: [
        "carousel-item",
        o.value,
        a.value,
        i.value
      ],
      ref: n
    }, t.default && t.default());
  }
});
var G = "top", q = "bottom", ee = "right", U = "left", Mt = "auto", Ye = [G, q, ee, U], Ee = "start", We = "end", ua = "clippingParents", gn = "viewport", Ne = "popper", fa = "reference", Xt = /* @__PURE__ */ Ye.reduce(function(e, t) {
  return e.concat([t + "-" + Ee, t + "-" + We]);
}, []), xn = /* @__PURE__ */ [].concat(Ye, [Mt]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ee, t + "-" + We]);
}, []), pa = "beforeRead", ya = "read", va = "afterRead", ha = "beforeMain", ma = "main", ga = "afterMain", xa = "beforeWrite", ba = "write", ja = "afterWrite", wa = [pa, ya, va, ha, ma, ga, xa, ba, ja];
function de(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function J(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function je(e) {
  var t = J(e).Element;
  return e instanceof t || e instanceof Element;
}
function Q(e) {
  var t = J(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function At(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = J(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ca(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, a = t.attributes[n] || {}, i = t.elements[n];
    !Q(i) || !de(i) || (Object.assign(i.style, r), Object.keys(a).forEach(function(o) {
      var l = a[o];
      l === !1 ? i.removeAttribute(o) : i.setAttribute(o, l === !0 ? "" : l);
    }));
  });
}
function Sa(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var a = t.elements[r], i = t.attributes[r] || {}, o = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = o.reduce(function(s, c) {
        return s[c] = "", s;
      }, {});
      !Q(a) || !de(a) || (Object.assign(a.style, l), Object.keys(i).forEach(function(s) {
        a.removeAttribute(s);
      }));
    });
  };
}
var ka = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ca,
  effect: Sa,
  requires: ["computeStyles"]
};
function se(e) {
  return e.split("-")[0];
}
var be = Math.max, nt = Math.min, Be = Math.round;
function xt() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function bn() {
  return !/^((?!chrome|android).)*safari/i.test(xt());
}
function Te(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), a = 1, i = 1;
  t && Q(e) && (a = e.offsetWidth > 0 && Be(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Be(r.height) / e.offsetHeight || 1);
  var o = je(e) ? J(e) : window, l = o.visualViewport, s = !bn() && n, c = (r.left + (s && l ? l.offsetLeft : 0)) / a, u = (r.top + (s && l ? l.offsetTop : 0)) / i, f = r.width / a, h = r.height / i;
  return {
    width: f,
    height: h,
    top: u,
    right: c + f,
    bottom: u + h,
    left: c,
    x: c,
    y: u
  };
}
function Et(e) {
  var t = Te(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function jn(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && At(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ve(e) {
  return J(e).getComputedStyle(e);
}
function Oa(e) {
  return ["table", "td", "th"].indexOf(de(e)) >= 0;
}
function he(e) {
  return ((je(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function dt(e) {
  return de(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (At(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    he(e)
  );
}
function _t(e) {
  return !Q(e) || // https://github.com/popperjs/popper-core/issues/837
  ve(e).position === "fixed" ? null : e.offsetParent;
}
function Ma(e) {
  var t = /firefox/i.test(xt()), n = /Trident/i.test(xt());
  if (n && Q(e)) {
    var r = ve(e);
    if (r.position === "fixed")
      return null;
  }
  var a = dt(e);
  for (At(a) && (a = a.host); Q(a) && ["html", "body"].indexOf(de(a)) < 0; ) {
    var i = ve(a);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return a;
    a = a.parentNode;
  }
  return null;
}
function Xe(e) {
  for (var t = J(e), n = _t(e); n && Oa(n) && ve(n).position === "static"; )
    n = _t(n);
  return n && (de(n) === "html" || de(n) === "body" && ve(n).position === "static") ? t : n || Ma(e) || t;
}
function Bt(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function De(e, t, n) {
  return be(e, nt(t, n));
}
function Aa(e, t, n) {
  var r = De(e, t, n);
  return r > n ? n : r;
}
function wn() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Cn(e) {
  return Object.assign({}, wn(), e);
}
function Sn(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ea = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Cn(typeof t != "number" ? t : Sn(t, Ye));
};
function Ba(e) {
  var t, n = e.state, r = e.name, a = e.options, i = n.elements.arrow, o = n.modifiersData.popperOffsets, l = se(n.placement), s = Bt(l), c = [U, ee].indexOf(l) >= 0, u = c ? "height" : "width";
  if (!(!i || !o)) {
    var f = Ea(a.padding, n), h = Et(i), v = s === "y" ? G : U, y = s === "y" ? q : ee, p = n.rects.reference[u] + n.rects.reference[s] - o[s] - n.rects.popper[u], m = o[s] - n.rects.reference[s], b = Xe(i), x = b ? s === "y" ? b.clientHeight || 0 : b.clientWidth || 0 : 0, j = p / 2 - m / 2, w = f[v], S = x - h[u] - f[y], C = x / 2 - h[u] / 2 + j, O = De(w, C, S), M = s;
    n.modifiersData[r] = (t = {}, t[M] = O, t.centerOffset = O - C, t);
  }
}
function Ta(e) {
  var t = e.state, n = e.options, r = n.element, a = r === void 0 ? "[data-popper-arrow]" : r;
  a != null && (typeof a == "string" && (a = t.elements.popper.querySelector(a), !a) || jn(t.elements.popper, a) && (t.elements.arrow = a));
}
var Va = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ba,
  effect: Ta,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ve(e) {
  return e.split("-")[1];
}
var $a = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Ia(e, t) {
  var n = e.x, r = e.y, a = t.devicePixelRatio || 1;
  return {
    x: Be(n * a) / a || 0,
    y: Be(r * a) / a || 0
  };
}
function Jt(e) {
  var t, n = e.popper, r = e.popperRect, a = e.placement, i = e.variation, o = e.offsets, l = e.position, s = e.gpuAcceleration, c = e.adaptive, u = e.roundOffsets, f = e.isFixed, h = o.x, v = h === void 0 ? 0 : h, y = o.y, p = y === void 0 ? 0 : y, m = typeof u == "function" ? u({
    x: v,
    y: p
  }) : {
    x: v,
    y: p
  };
  v = m.x, p = m.y;
  var b = o.hasOwnProperty("x"), x = o.hasOwnProperty("y"), j = U, w = G, S = window;
  if (c) {
    var C = Xe(n), O = "clientHeight", M = "clientWidth";
    if (C === J(n) && (C = he(n), ve(C).position !== "static" && l === "absolute" && (O = "scrollHeight", M = "scrollWidth")), C = C, a === G || (a === U || a === ee) && i === We) {
      w = q;
      var A = f && C === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[O]
      );
      p -= A - r.height, p *= s ? 1 : -1;
    }
    if (a === U || (a === G || a === q) && i === We) {
      j = ee;
      var V = f && C === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[M]
      );
      v -= V - r.width, v *= s ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: l
  }, c && $a), X = u === !0 ? Ia({
    x: v,
    y: p
  }, J(n)) : {
    x: v,
    y: p
  };
  if (v = X.x, p = X.y, s) {
    var I;
    return Object.assign({}, B, (I = {}, I[w] = x ? "0" : "", I[j] = b ? "0" : "", I.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + p + "px)" : "translate3d(" + v + "px, " + p + "px, 0)", I));
  }
  return Object.assign({}, B, (t = {}, t[w] = x ? p + "px" : "", t[j] = b ? v + "px" : "", t.transform = "", t));
}
function Pa(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, a = r === void 0 ? !0 : r, i = n.adaptive, o = i === void 0 ? !0 : i, l = n.roundOffsets, s = l === void 0 ? !0 : l, c = {
    placement: se(t.placement),
    variation: Ve(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: a,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Jt(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: s
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Jt(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
var La = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Pa,
  data: {}
}, Qe = {
  passive: !0
};
function za(e) {
  var t = e.state, n = e.instance, r = e.options, a = r.scroll, i = a === void 0 ? !0 : a, o = r.resize, l = o === void 0 ? !0 : o, s = J(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(u) {
    u.addEventListener("scroll", n.update, Qe);
  }), l && s.addEventListener("resize", n.update, Qe), function() {
    i && c.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Qe);
    }), l && s.removeEventListener("resize", n.update, Qe);
  };
}
var Ha = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: za,
  data: {}
}, Ra = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function qe(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Ra[t];
  });
}
var Na = {
  start: "end",
  end: "start"
};
function Zt(e) {
  return e.replace(/start|end/g, function(t) {
    return Na[t];
  });
}
function Tt(e) {
  var t = J(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Vt(e) {
  return Te(he(e)).left + Tt(e).scrollLeft;
}
function Da(e, t) {
  var n = J(e), r = he(e), a = n.visualViewport, i = r.clientWidth, o = r.clientHeight, l = 0, s = 0;
  if (a) {
    i = a.width, o = a.height;
    var c = bn();
    (c || !c && t === "fixed") && (l = a.offsetLeft, s = a.offsetTop);
  }
  return {
    width: i,
    height: o,
    x: l + Vt(e),
    y: s
  };
}
function Fa(e) {
  var t, n = he(e), r = Tt(e), a = (t = e.ownerDocument) == null ? void 0 : t.body, i = be(n.scrollWidth, n.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), o = be(n.scrollHeight, n.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), l = -r.scrollLeft + Vt(e), s = -r.scrollTop;
  return ve(a || n).direction === "rtl" && (l += be(n.clientWidth, a ? a.clientWidth : 0) - i), {
    width: i,
    height: o,
    x: l,
    y: s
  };
}
function $t(e) {
  var t = ve(e), n = t.overflow, r = t.overflowX, a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + a + r);
}
function kn(e) {
  return ["html", "body", "#document"].indexOf(de(e)) >= 0 ? e.ownerDocument.body : Q(e) && $t(e) ? e : kn(dt(e));
}
function Fe(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = kn(e), a = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = J(r), o = a ? [i].concat(i.visualViewport || [], $t(r) ? r : []) : r, l = t.concat(o);
  return a ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Fe(dt(o)))
  );
}
function bt(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Ka(e, t) {
  var n = Te(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Qt(e, t, n) {
  return t === gn ? bt(Da(e, n)) : je(t) ? Ka(t, n) : bt(Fa(he(e)));
}
function Wa(e) {
  var t = Fe(dt(e)), n = ["absolute", "fixed"].indexOf(ve(e).position) >= 0, r = n && Q(e) ? Xe(e) : e;
  return je(r) ? t.filter(function(a) {
    return je(a) && jn(a, r) && de(a) !== "body";
  }) : [];
}
function Ga(e, t, n, r) {
  var a = t === "clippingParents" ? Wa(e) : [].concat(t), i = [].concat(a, [n]), o = i[0], l = i.reduce(function(s, c) {
    var u = Qt(e, c, r);
    return s.top = be(u.top, s.top), s.right = nt(u.right, s.right), s.bottom = nt(u.bottom, s.bottom), s.left = be(u.left, s.left), s;
  }, Qt(e, o, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function On(e) {
  var t = e.reference, n = e.element, r = e.placement, a = r ? se(r) : null, i = r ? Ve(r) : null, o = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, s;
  switch (a) {
    case G:
      s = {
        x: o,
        y: t.y - n.height
      };
      break;
    case q:
      s = {
        x: o,
        y: t.y + t.height
      };
      break;
    case ee:
      s = {
        x: t.x + t.width,
        y: l
      };
      break;
    case U:
      s = {
        x: t.x - n.width,
        y: l
      };
      break;
    default:
      s = {
        x: t.x,
        y: t.y
      };
  }
  var c = a ? Bt(a) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (i) {
      case Ee:
        s[c] = s[c] - (t[u] / 2 - n[u] / 2);
        break;
      case We:
        s[c] = s[c] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return s;
}
function Ge(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, a = r === void 0 ? e.placement : r, i = n.strategy, o = i === void 0 ? e.strategy : i, l = n.boundary, s = l === void 0 ? ua : l, c = n.rootBoundary, u = c === void 0 ? gn : c, f = n.elementContext, h = f === void 0 ? Ne : f, v = n.altBoundary, y = v === void 0 ? !1 : v, p = n.padding, m = p === void 0 ? 0 : p, b = Cn(typeof m != "number" ? m : Sn(m, Ye)), x = h === Ne ? fa : Ne, j = e.rects.popper, w = e.elements[y ? x : h], S = Ga(je(w) ? w : w.contextElement || he(e.elements.popper), s, u, o), C = Te(e.elements.reference), O = On({
    reference: C,
    element: j,
    strategy: "absolute",
    placement: a
  }), M = bt(Object.assign({}, j, O)), A = h === Ne ? M : C, V = {
    top: S.top - A.top + b.top,
    bottom: A.bottom - S.bottom + b.bottom,
    left: S.left - A.left + b.left,
    right: A.right - S.right + b.right
  }, B = e.modifiersData.offset;
  if (h === Ne && B) {
    var X = B[a];
    Object.keys(V).forEach(function(I) {
      var Z = [ee, q].indexOf(I) >= 0 ? 1 : -1, le = [G, q].indexOf(I) >= 0 ? "y" : "x";
      V[I] += X[le] * Z;
    });
  }
  return V;
}
function Ua(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, a = n.boundary, i = n.rootBoundary, o = n.padding, l = n.flipVariations, s = n.allowedAutoPlacements, c = s === void 0 ? xn : s, u = Ve(r), f = u ? l ? Xt : Xt.filter(function(y) {
    return Ve(y) === u;
  }) : Ye, h = f.filter(function(y) {
    return c.indexOf(y) >= 0;
  });
  h.length === 0 && (h = f);
  var v = h.reduce(function(y, p) {
    return y[p] = Ge(e, {
      placement: p,
      boundary: a,
      rootBoundary: i,
      padding: o
    })[se(p)], y;
  }, {});
  return Object.keys(v).sort(function(y, p) {
    return v[y] - v[p];
  });
}
function Ya(e) {
  if (se(e) === Mt)
    return [];
  var t = qe(e);
  return [Zt(e), t, Zt(t)];
}
function Xa(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var a = n.mainAxis, i = a === void 0 ? !0 : a, o = n.altAxis, l = o === void 0 ? !0 : o, s = n.fallbackPlacements, c = n.padding, u = n.boundary, f = n.rootBoundary, h = n.altBoundary, v = n.flipVariations, y = v === void 0 ? !0 : v, p = n.allowedAutoPlacements, m = t.options.placement, b = se(m), x = b === m, j = s || (x || !y ? [qe(m)] : Ya(m)), w = [m].concat(j).reduce(function(R, re) {
      return R.concat(se(re) === Mt ? Ua(t, {
        placement: re,
        boundary: u,
        rootBoundary: f,
        padding: c,
        flipVariations: y,
        allowedAutoPlacements: p
      }) : re);
    }, []), S = t.rects.reference, C = t.rects.popper, O = /* @__PURE__ */ new Map(), M = !0, A = w[0], V = 0; V < w.length; V++) {
      var B = w[V], X = se(B), I = Ve(B) === Ee, Z = [G, q].indexOf(X) >= 0, le = Z ? "width" : "height", P = Ge(t, {
        placement: B,
        boundary: u,
        rootBoundary: f,
        altBoundary: h,
        padding: c
      }), T = Z ? I ? ee : U : I ? q : G;
      S[le] > C[le] && (T = qe(T));
      var te = qe(T), H = [];
      if (i && H.push(P[X] <= 0), l && H.push(P[T] <= 0, P[te] <= 0), H.every(function(R) {
        return R;
      })) {
        A = B, M = !1;
        break;
      }
      O.set(B, H);
    }
    if (M)
      for (var me = y ? 3 : 1, ne = function(re) {
        var Re = w.find(function(Je) {
          var ge = O.get(Je);
          if (ge)
            return ge.slice(0, re).every(function(ft) {
              return ft;
            });
        });
        if (Re)
          return A = Re, "break";
      }, ae = me; ae > 0; ae--) {
        var fe = ne(ae);
        if (fe === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
var _a = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Xa,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function qt(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function en(e) {
  return [G, ee, q, U].some(function(t) {
    return e[t] >= 0;
  });
}
function Ja(e) {
  var t = e.state, n = e.name, r = t.rects.reference, a = t.rects.popper, i = t.modifiersData.preventOverflow, o = Ge(t, {
    elementContext: "reference"
  }), l = Ge(t, {
    altBoundary: !0
  }), s = qt(o, r), c = qt(l, a, i), u = en(s), f = en(c);
  t.modifiersData[n] = {
    referenceClippingOffsets: s,
    popperEscapeOffsets: c,
    isReferenceHidden: u,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": f
  });
}
var Za = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Ja
};
function Qa(e, t, n) {
  var r = se(e), a = [U, G].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, o = i[0], l = i[1];
  return o = o || 0, l = (l || 0) * a, [U, ee].indexOf(r) >= 0 ? {
    x: l,
    y: o
  } : {
    x: o,
    y: l
  };
}
function qa(e) {
  var t = e.state, n = e.options, r = e.name, a = n.offset, i = a === void 0 ? [0, 0] : a, o = xn.reduce(function(u, f) {
    return u[f] = Qa(f, t.rects, i), u;
  }, {}), l = o[t.placement], s = l.x, c = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = o;
}
var er = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qa
};
function tr(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = On({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
var nr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: tr,
  data: {}
};
function ar(e) {
  return e === "x" ? "y" : "x";
}
function rr(e) {
  var t = e.state, n = e.options, r = e.name, a = n.mainAxis, i = a === void 0 ? !0 : a, o = n.altAxis, l = o === void 0 ? !1 : o, s = n.boundary, c = n.rootBoundary, u = n.altBoundary, f = n.padding, h = n.tether, v = h === void 0 ? !0 : h, y = n.tetherOffset, p = y === void 0 ? 0 : y, m = Ge(t, {
    boundary: s,
    rootBoundary: c,
    padding: f,
    altBoundary: u
  }), b = se(t.placement), x = Ve(t.placement), j = !x, w = Bt(b), S = ar(w), C = t.modifiersData.popperOffsets, O = t.rects.reference, M = t.rects.popper, A = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, V = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, X = {
    x: 0,
    y: 0
  };
  if (C) {
    if (i) {
      var I, Z = w === "y" ? G : U, le = w === "y" ? q : ee, P = w === "y" ? "height" : "width", T = C[w], te = T + m[Z], H = T - m[le], me = v ? -M[P] / 2 : 0, ne = x === Ee ? O[P] : M[P], ae = x === Ee ? -M[P] : -O[P], fe = t.elements.arrow, R = v && fe ? Et(fe) : {
        width: 0,
        height: 0
      }, re = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : wn(), Re = re[Z], Je = re[le], ge = De(0, O[P], R[P]), ft = j ? O[P] / 2 - me - ge - Re - V.mainAxis : ne - ge - Re - V.mainAxis, Gn = j ? -O[P] / 2 + me + ge + Je + V.mainAxis : ae + ge + Je + V.mainAxis, pt = t.elements.arrow && Xe(t.elements.arrow), Un = pt ? w === "y" ? pt.clientTop || 0 : pt.clientLeft || 0 : 0, Ht = (I = B == null ? void 0 : B[w]) != null ? I : 0, Yn = T + ft - Ht - Un, Xn = T + Gn - Ht, Rt = De(v ? nt(te, Yn) : te, T, v ? be(H, Xn) : H);
      C[w] = Rt, X[w] = Rt - T;
    }
    if (l) {
      var Nt, _n = w === "x" ? G : U, Jn = w === "x" ? q : ee, xe = C[S], Ze = S === "y" ? "height" : "width", Dt = xe + m[_n], Ft = xe - m[Jn], yt = [G, U].indexOf(b) !== -1, Kt = (Nt = B == null ? void 0 : B[S]) != null ? Nt : 0, Wt = yt ? Dt : xe - O[Ze] - M[Ze] - Kt + V.altAxis, Gt = yt ? xe + O[Ze] + M[Ze] - Kt - V.altAxis : Ft, Ut = v && yt ? Aa(Wt, xe, Gt) : De(v ? Wt : Dt, xe, v ? Gt : Ft);
      C[S] = Ut, X[S] = Ut - xe;
    }
    t.modifiersData[r] = X;
  }
}
var ir = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: rr,
  requiresIfExists: ["offset"]
};
function or(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function lr(e) {
  return e === J(e) || !Q(e) ? Tt(e) : or(e);
}
function sr(e) {
  var t = e.getBoundingClientRect(), n = Be(t.width) / e.offsetWidth || 1, r = Be(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function cr(e, t, n) {
  n === void 0 && (n = !1);
  var r = Q(t), a = Q(t) && sr(t), i = he(t), o = Te(e, a, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((de(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  $t(i)) && (l = lr(t)), Q(t) ? (s = Te(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : i && (s.x = Vt(i))), {
    x: o.left + l.scrollLeft - s.x,
    y: o.top + l.scrollTop - s.y,
    width: o.width,
    height: o.height
  };
}
function dr(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function a(i) {
    n.add(i.name);
    var o = [].concat(i.requires || [], i.requiresIfExists || []);
    o.forEach(function(l) {
      if (!n.has(l)) {
        var s = t.get(l);
        s && a(s);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || a(i);
  }), r;
}
function ur(e) {
  var t = dr(e);
  return wa.reduce(function(n, r) {
    return n.concat(t.filter(function(a) {
      return a.phase === r;
    }));
  }, []);
}
function fr(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function pr(e) {
  var t = e.reduce(function(n, r) {
    var a = n[r.name];
    return n[r.name] = a ? Object.assign({}, a, r, {
      options: Object.assign({}, a.options, r.options),
      data: Object.assign({}, a.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var tn = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function nn() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function yr(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, a = t.defaultOptions, i = a === void 0 ? tn : a;
  return function(l, s, c) {
    c === void 0 && (c = i);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, tn, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: s
      },
      attributes: {},
      styles: {}
    }, f = [], h = !1, v = {
      state: u,
      setOptions: function(b) {
        var x = typeof b == "function" ? b(u.options) : b;
        p(), u.options = Object.assign({}, i, u.options, x), u.scrollParents = {
          reference: je(l) ? Fe(l) : l.contextElement ? Fe(l.contextElement) : [],
          popper: Fe(s)
        };
        var j = ur(pr([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = j.filter(function(w) {
          return w.enabled;
        }), y(), v.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var b = u.elements, x = b.reference, j = b.popper;
          if (nn(x, j)) {
            u.rects = {
              reference: cr(x, Xe(j), u.options.strategy === "fixed"),
              popper: Et(j)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(V) {
              return u.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var w = 0; w < u.orderedModifiers.length; w++) {
              if (u.reset === !0) {
                u.reset = !1, w = -1;
                continue;
              }
              var S = u.orderedModifiers[w], C = S.fn, O = S.options, M = O === void 0 ? {} : O, A = S.name;
              typeof C == "function" && (u = C({
                state: u,
                options: M,
                name: A,
                instance: v
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: fr(function() {
        return new Promise(function(m) {
          v.forceUpdate(), m(u);
        });
      }),
      destroy: function() {
        p(), h = !0;
      }
    };
    if (!nn(l, s))
      return v;
    v.setOptions(c).then(function(m) {
      !h && c.onFirstUpdate && c.onFirstUpdate(m);
    });
    function y() {
      u.orderedModifiers.forEach(function(m) {
        var b = m.name, x = m.options, j = x === void 0 ? {} : x, w = m.effect;
        if (typeof w == "function") {
          var S = w({
            state: u,
            name: b,
            instance: v,
            options: j
          }), C = function() {
          };
          f.push(S || C);
        }
      });
    }
    function p() {
      f.forEach(function(m) {
        return m();
      }), f = [];
    }
    return v;
  };
}
var vr = [Ha, nr, La, ka, er, _a, ir, Va, Za], hr = /* @__PURE__ */ yr({
  defaultModifiers: vr
});
const It = () => {
  const e = k(), t = (r, a, i) => {
    e.value = hr(r, a, i);
  }, n = () => {
    e.value && e.value.destroy(), e.value = void 0;
  };
  return {
    popper: e.value,
    initPopper: t,
    destroyPopper: n
  };
}, mr = (e, t, n, r) => {
  let a = e;
  return t === "dropup" && (a = r ? "top-end" : "top-start"), t === "dropup-center" && (a = "top"), t === "dropend" && (a = r ? "left-start" : "right-start"), t === "dropstart" && (a = r ? "right-start" : "left-start"), n === "end" && (a = r ? "bottom-start" : "bottom-end"), a;
}, Mn = g({
  name: "CDropdown",
  props: {
    /**
     * Set aligment of dropdown menu.
     *
     * @values { 'start' | 'end' | { xs: 'start' | 'end' } | { sm: 'start' | 'end' } | { md: 'start' | 'end' } | { lg: 'start' | 'end' } | { xl: 'start' | 'end'} | { xxl: 'start' | 'end'} }
     */
    alignment: {
      type: [String, Object],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (e) => e === "start" || e === "end" ? !0 : e.xs !== void 0 && (e.xs === "start" || e.xs === "end") || e.sm !== void 0 && (e.sm === "start" || e.sm === "end") || e.md !== void 0 && (e.md === "start" || e.md === "end") || e.lg !== void 0 && (e.lg === "start" || e.lg === "end") || e.xl !== void 0 && (e.xl === "start" || e.xl === "end") || e.xxl !== void 0 && (e.xxl === "start" || e.xxl === "end")
    },
    /**
     * Configure the auto close behavior of the dropdown:
     * - `true` - the dropdown will be closed by clicking outside or inside the dropdown menu.
     * - `false` - the dropdown will be closed by clicking the toggle button and manually calling hide or toggle method. (Also will not be closed by pressing esc key)
     * - `'inside'` - the dropdown will be closed (only) by clicking inside the dropdown menu.
     * - `'outside'` - the dropdown will be closed (only) by clicking outside the dropdown menu.
     */
    autoClose: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "boolean" || ["inside", "outside"].includes(e)
    },
    /**
     * Sets a darker color scheme to match a dark navbar.
     */
    dark: Boolean,
    /**
     * Sets a specified  direction and location of the dropdown menu.
     *
     * @values 'center', 'dropup', 'dropup-center', 'dropend', 'dropstart'
     */
    direction: {
      type: String,
      validator: (e) => ["center", "dropup", "dropup-center", "dropend", "dropstart"].includes(e)
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Offset of the dropdown menu relative to its target.
     *
     * @since 4.9.0
     */
    offset: {
      type: Array,
      default: () => [0, 2]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     *
     * @values 'auto', 'top-end', 'top', 'top-start', 'bottom-end', 'bottom', 'bottom-start', 'right-start', 'right', 'right-end', 'left-start', 'left', 'left-end'
     */
    placement: {
      type: String,
      default: "bottom-start"
    },
    /**
     * If you want to disable dynamic positioning set this property to `true`.
     */
    popper: {
      type: Boolean,
      default: !0
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the dropdown variant to an btn-group, dropdown, input-group, and nav-item.
     *
     * @values 'btn-group', 'dropdown', 'input-group', 'nav-item'
     */
    variant: {
      type: String,
      default: "btn-group",
      validator: (e) => ["btn-group", "dropdown", "input-group", "nav-item"].includes(e)
    },
    /**
     * Toggle the visibility of dropdown menu component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(), a = k(), i = k(typeof e.alignment == "object" ? !1 : e.popper), o = k(e.visible), { initPopper: l, destroyPopper: s } = It(), c = {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: mr(e.placement, e.direction, e.alignment, gt(a.value))
    };
    K(() => e.visible, () => {
      o.value = e.visible;
    }), K(o, () => {
      if (o.value && r.value && a.value) {
        i.value && l(r.value, a.value, c), window.addEventListener("mouseup", f), window.addEventListener("keyup", u), n("show");
        return;
      }
      i.value && s(), window.removeEventListener("mouseup", f), window.removeEventListener("keyup", u), n("hide");
    }), N("config", {
      alignment: e.alignment,
      dark: e.dark,
      popper: e.popper
    }), N("variant", e.variant), N("visible", o), N("dropdownToggleRef", r), N("dropdownMenuRef", a);
    const u = (v) => {
      e.autoClose !== !1 && v.key === "Escape" && h(!1);
    }, f = (v) => {
      if (!(!r.value || !a.value) && !r.value.contains(v.target) && (e.autoClose === !0 || e.autoClose === "inside" && a.value.contains(v.target) || e.autoClose === "outside" && !a.value.contains(v.target))) {
        h(!1);
        return;
      }
    }, h = (v) => {
      if (!e.disabled) {
        if (typeof v == "boolean") {
          o.value = v;
          return;
        }
        if (o.value === !0) {
          o.value = !1;
          return;
        }
        o.value = !0;
      }
    };
    return N("setVisible", h), () => e.variant === "input-group" ? [t.default && t.default()] : d("div", {
      class: [
        e.variant === "nav-item" ? "nav-item dropdown" : e.variant,
        e.direction === "center" ? "dropdown-center" : e.direction === "dropup-center" ? "dropup dropup-center" : e.direction
      ]
    }, t.default && t.default());
  }
}), An = g({
  name: "CDropdownItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => d(ct, {
      class: "dropdown-item",
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    });
  }
});
g({
  name: "CDropdownHeader",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h6"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: "dropdown-header"
    }, t.default && t.default());
  }
});
g({
  name: "CDropdownDivider",
  setup() {
    return () => d("hr", {
      class: "dropdown-divider"
    });
  }
});
const En = g({
  name: "CDropdownMenu",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     * @values 'div', 'ul'
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    const n = L("dropdownMenuRef"), r = L("config"), a = L("visible"), { alignment: i, dark: o, popper: l } = r, s = (c) => {
      const u = [];
      return typeof c == "object" && Object.keys(c).map((f) => {
        u.push(`dropdown-menu${f === "xs" ? "" : `-${f}`}-${c[f]}`);
      }), typeof c == "string" && u.push(`dropdown-menu-${c}`), u;
    };
    return () => d(e.component, {
      class: [
        "dropdown-menu",
        { "dropdown-menu-dark": o, show: a.value },
        s(i)
      ],
      ...(typeof i == "object" || !l) && {
        "data-coreui-popper": "static"
      },
      ref: n
    }, e.component === "ul" ? t.default && t.default().map((c) => d("li", {}, c)) : t.default && t.default());
  }
}), Bn = g({
  name: "CDropdownToggle",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Enables pseudo element caret on toggler.
     */
    caret: {
      type: Boolean,
      default: !0
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "button"
    },
    /**
     * Create a custom toggler which accepts any content.
     */
    custom: Boolean,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @values 'rounded', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3'
     */
    shape: lt,
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` className for proper spacing around the dropdown caret.
     */
    split: Boolean,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @type 'hover' | 'focus' | 'click'
     */
    trigger: {
      type: String,
      default: "click"
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'ghost', 'outline'
     */
    variant: {
      type: String,
      validator: (e) => ["ghost", "outline"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    const n = k(), r = L("dropdownToggleRef"), a = L("variant"), i = L("visible"), o = L("setVisible"), l = [
      {
        "dropdown-toggle": e.caret,
        "dropdown-toggle-split": e.split,
        active: e.active,
        disabled: e.disabled
      }
    ], s = {
      ...(e.trigger === "click" || e.trigger.includes("click")) && {
        onClick: () => {
          e.disabled || o();
        }
      },
      ...(e.trigger === "focus" || e.trigger.includes("focus")) && {
        onfocus: () => {
          e.disabled || o(!0);
        },
        onblur: () => {
          e.disabled || o(!1);
        }
      }
    };
    return Ue(() => {
      n.value && (r.value = n.value.$el);
    }), () => e.custom ? t.default && t.default().map((c) => ea(c, {
      ref: (u) => {
        n.value = u;
      },
      ...s
    })) : a === "nav-item" ? d("a", {
      active: e.active,
      class: [
        "nav-link",
        l,
        {
          show: i.value
        }
      ],
      disabled: e.disabled,
      href: "#",
      ref: r,
      ...s
    }, { default: () => t.default && t.default() }) : d(st, {
      class: [
        l,
        {
          show: i.value
        }
      ],
      active: e.active,
      color: e.color,
      disabled: e.disabled,
      ref: (c) => {
        n.value = c;
      },
      shape: e.shape,
      size: e.size,
      ...s,
      ...e.component === "button" && { type: "button" },
      variant: e.variant
    }, () => e.split ? d("span", { class: "visually-hidden" }, "Toggle Dropdown") : t.default && t.default());
  }
});
g({
  name: "CFooter",
  props: {
    /**
     * Place footer in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (e) => ["fixed", "sticky"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d("div", { class: ["footer", { [`footer-${e.position}`]: e.position }] }, t.default && t.default());
  }
});
g({
  name: "CForm",
  props: {
    /**
     * Mark a form as validated. If you set it `true`, all validation styles will be applied to the forms component.
     */
    validated: Boolean
  },
  setup(e, { slots: t }) {
    return () => d("form", { class: [{ "was-validated": e.validated }] }, t.default && t.default());
  }
});
const vt = g({
  name: "CFormFeedback",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Method called immediately after the `value` prop changes.
     */
    invalid: Boolean,
    /**
     * If your form layout allows it, you can display validation feedback in a styled tooltip.
     */
    tooltip: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        {
          [`invalid-${e.tooltip ? "tooltip" : "feedback"}`]: e.invalid,
          [`valid-${e.tooltip ? "tooltip" : "feedback"}`]: e.valid
        }
      ]
    }, t.default && t.default());
  }
}), jt = g({
  name: "CFormControlValidation",
  inheritAttrs: !1,
  props: {
    /**
     * @ignore
     */
    describedby: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  setup(e, { slots: t }) {
    return () => [
      e.feedback && (e.valid || e.invalid) && d(vt, {
        ...e.invalid && { id: e.describedby },
        invalid: e.invalid,
        tooltip: e.tooltipFeedback,
        valid: e.valid
      }, {
        default: () => t.feedback && t.feedback() || e.feedback
      }),
      (e.feedbackInvalid || t.feedbackInvalid) && d(vt, {
        id: e.describedby,
        invalid: !0,
        tooltip: e.tooltipFeedback
      }, {
        default: () => t.feedbackInvalid && t.feedbackInvalid() || e.feedbackInvalid
      }),
      (e.feedbackValid || t.feedbackValid) && d(vt, {
        tooltip: e.tooltipFeedback,
        valid: !0
      }, {
        default: () => t.feedbackValid && t.feedbackValid() || e.feedbackValid
      })
    ];
  }
}), $e = g({
  name: "CFormLabel",
  props: {
    /**
     * A string of all className you want to be applied to the component, and override standard className value.
     */
    customClassName: [Array, String]
  },
  setup(e, { slots: t }) {
    return () => d("label", {
      class: e.customClassName ?? "form-label"
    }, t.default && t.default());
  }
});
g({
  name: "CFormCheck",
  inheritAttrs: !1,
  props: {
    /**
     * Create button-like checkboxes and radio buttons.
     *
     * @see http://coreui.io/vue/docs/components/button.html
     */
    button: Object,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `false` state.
     *
     * @since 4.10.0
     */
    falseValue: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Sets hit area to the full area of the component.
     */
    hitArea: {
      type: String,
      validator: (e) => ["full"].includes(e)
    },
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Input Checkbox indeterminate Property
     */
    indeterminate: Boolean,
    /**
     * Group checkboxes or radios on the same horizontal row by adding.
     */
    inline: Boolean,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [Array, Boolean, String],
      value: void 0
    },
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Use in conjunction with the v-model directive to specify the value that should be assigned to the bound variable when the checkbox is in the `true` state.
     *
     * @since 4.10.0
     */
    trueValue: String,
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean,
    /**
     * The value attribute of component.
     */
    value: String
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: r }) {
    const a = (f) => {
      const h = f.target;
      if (n("change", f), e.falseValue && e.trueValue) {
        n("update:modelValue", h.checked ? e.trueValue : e.falseValue);
        return;
      }
      if (e.value && Array.isArray(e.modelValue)) {
        e.modelValue.includes(e.value) ? n("update:modelValue", e.modelValue.filter((v) => v !== e.value)) : n("update:modelValue", [...e.modelValue, e.value]);
        return;
      }
      if (e.value === void 0) {
        n("update:modelValue", h.checked);
        return;
      }
      e.value && (e.modelValue === void 0 || typeof e.modelValue == "string") && n("update:modelValue", h.checked ? e.value : void 0);
    }, i = [
      "form-check",
      {
        "form-check-inline": e.inline,
        "form-check-reverse": e.reverse,
        "is-invalid": e.invalid,
        "is-valid": e.valid
      },
      t.class
    ], o = [
      e.button ? "btn-check" : "form-check-input",
      {
        "is-invalid": e.invalid,
        "is-valid": e.valid,
        "me-2": e.hitArea
      }
    ], l = Me(() => Array.isArray(e.modelValue) ? e.modelValue.includes(e.value) : typeof e.modelValue == "string" ? e.modelValue === e.value : e.modelValue), s = () => d("input", {
      ...t,
      ...(e.modelValue || e.value) && { checked: l.value },
      class: o,
      id: e.id,
      indeterminate: e.indeterminate,
      onChange: (f) => a(f),
      type: e.type,
      value: e.value
    }), c = () => e.button ? d(st, {
      component: "label",
      ...e.button,
      ...e.id && { for: e.id }
    }, {
      default: () => r.label && r.label() || e.label
    }) : d($e, { class: "form-check-label", ...e.id && { for: e.id } }, {
      default: () => r.label && r.label() || e.label
    }), u = () => d(jt, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      invalid: e.invalid,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    });
    return () => e.button ? [s(), (r.label || e.label) && c(), u()] : e.label ? e.hitArea ? [
      d($e, {
        customClassName: i,
        ...e.id && { for: e.id }
      }, [s(), e.label]),
      u()
    ] : d("div", {
      class: i
    }, [s(), e.label && c(), u()]) : s();
  }
});
const gr = g({
  name: "CFormFloating",
  setup(e, { slots: t }) {
    return () => d("div", {
      class: "form-floating"
    }, t.default && t.default());
  }
}), an = g({
  name: "CFormText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "form-text" }, t.default && t.default());
  }
}), Pt = g({
  name: "CFormControlWrapper",
  inheritAttrs: !1,
  props: {
    ...jt.props,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * @ignore
     */
    id: String,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String
  },
  setup(e, { slots: t }) {
    const n = () => d(jt, {
      describedby: e.describedby,
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      invalid: e.invalid,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      ...t.feedback && { feedback: () => t.feedback && t.feedback() },
      ...t.feedbackInvalid && {
        feedbackInvalid: () => t.feedbackInvalid && t.feedbackInvalid()
      },
      ...t.feedbackValid && {
        feedbackValid: () => t.feedbackInvalid && t.feedbackInvalid()
      }
    });
    return () => e.floatingLabel ? d(gr, () => [
      t.default && t.default(),
      d($e, {
        for: e.id
      }, {
        default: () => t.label && t.label() || e.label || e.floatingLabel
      }),
      (e.text || t.text) && d(an, {
        id: e.describedby
      }, {
        default: () => t.text && t.text() || e.text
      }),
      n()
    ]) : [
      (e.label || t.label) && d($e, {
        for: e.id
      }, {
        default: () => t.label && t.label() || e.label
      }),
      t.default && t.default(),
      (e.text || t.text) && d(an, {
        id: e.describedby
      }, {
        default: () => t.text && t.text() || e.text
      }),
      n()
    ];
  }
}), xr = typeof window > "u" ? class extends Object {
} : window.File;
g({
  name: "CFormInput",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    // Inherited Props from CFormControlWrapper
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [xr, Number, String],
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Specifies the type of component.
     *
     * @values 'color' | 'file' | 'text' | string
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: r }) {
    const a = (o) => {
      const l = o.target;
      n("change", o), n("update:modelValue", l.value);
    }, i = (o) => {
      const l = o.target;
      n("input", o), n("update:modelValue", l.value);
    };
    return () => d(Pt, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => d("input", {
        id: e.id,
        ...t,
        class: [
          e.plainText ? "form-control-plaintext" : "form-control",
          {
            "form-control-color": e.type === "color",
            [`form-control-${e.size}`]: e.size,
            "is-invalid": e.invalid,
            "is-valid": e.valid
          },
          t.class
        ],
        disabled: e.disabled,
        onChange: (o) => a(o),
        onInput: (o) => i(o),
        readonly: e.readonly,
        type: e.type,
        ...(e.modelValue || e.modelValue === 0) && { value: e.modelValue }
      }, r.default && r.default()),
      ...r.feedback && { feedback: () => r.feedback && r.feedback() },
      ...r.feedbackInvalid && {
        feedbackInvalid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.feedbackValid && {
        feedbackValid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.label && { label: () => r.label && r.label() },
      ...r.text && { text: () => r.text && r.text() }
    });
  }
});
g({
  name: "CFormRange",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * Specifies the maximum value for the component.
     */
    max: Number,
    /**
     * Specifies the minimum value for the component.
     */
    min: Number,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Specifies the interval between legal numbers in the component.
     */
    steps: Number,
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value: Number
  },
  emits: [
    /**
     * Event occurs when the value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: r }) {
    const a = (i) => {
      const o = i.target;
      n("change", i), n("update:modelValue", o.value);
    };
    return () => [
      e.label && d($e, {
        for: t.id
      }, {
        default: () => r.label && r.label() || e.label
      }),
      d("input", {
        ...t,
        class: "form-range",
        disabled: e.disabled,
        max: e.max,
        min: e.min,
        onChange: (i) => a(i),
        readonly: e.readonly,
        steps: e.steps,
        type: "range",
        value: e.modelValue
      }, r.default && r.default())
    ];
  }
});
g({
  name: "CFormSelect",
  props: {
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * Specifies the number of visible options in a drop-down list.
     */
    htmlSize: Number,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: {
      type: [String, Array]
    },
    multiple: Boolean,
    /**
     * Options list of the select component. Available keys: `label`, `value`, `disabled`.
     * Examples:
     * - `:options="[{ value: 'js', label: 'JavaScript' }, { value: 'html', label: 'HTML', disabled: true }]"`
     * - `:options="['js', 'html']"`
     */
    options: Array,
    /**
     * Size the component small or large.
     *
     * @values 'sm' | 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    },
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when when a user changes the selected option of a `<select>` element.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: r }) {
    const a = (i) => {
      const o = i.target, l = Array.from(o.options).filter((s) => s.selected).map((s) => s.value);
      n("change", i), n("update:modelValue", o.multiple ? l : l[0]);
    };
    return () => d(Pt, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => d("select", {
        id: e.id,
        ...t,
        class: [
          "form-select",
          {
            [`form-select-${e.size}`]: e.size,
            "is-invalid": e.invalid,
            "is-valid": e.valid
          },
          t.class
        ],
        multiple: e.multiple,
        onChange: (i) => a(i),
        size: e.htmlSize,
        ...e.modelValue && !e.multiple && { value: e.modelValue }
      }, e.options ? e.options.map((i) => d("option", {
        ...typeof i == "object" && {
          ...i.disabled && { disabled: i.disabled },
          ...i.selected && { selected: i.selected },
          ...i.value !== void 0 && {
            value: i.value,
            ...e.modelValue && e.multiple && e.modelValue.includes(i.value) && { selected: !0 }
          }
        }
      }, typeof i == "string" ? i : i.label)) : r.default && r.default()),
      ...r.feedback && { feedback: () => r.feedback && r.feedback() },
      ...r.feedbackInvalid && {
        feedbackInvalid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.feedbackValid && {
        feedbackValid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.label && { label: () => r.label && r.label() },
      ...r.text && { text: () => r.text && r.text() }
    });
  }
});
g({
  name: "CFormSwitch",
  inheritAttrs: !1,
  props: {
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * The element represents a caption for a component.
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: [Boolean, String],
    /**
     * Put checkboxes or radios on the opposite side.
     *
     * @since 4.8.0
     */
    reverse: Boolean,
    /**
     * Size the component large or extra large. Works only with `switch`.
     *
     * @values 'lg' | 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["lg", "xl"].includes(e)
    },
    /**
     * Specifies the type of component.
     *
     * @values 'checkbox', 'radio'
     */
    type: {
      type: String,
      default: "checkbox"
    },
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the checked value has been changed.
     */
    "change",
    /**
     * Emit the new value whenever there’s a change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n }) {
    const r = (a) => {
      const i = a.target;
      n("change", a), n("update:modelValue", i.checked);
    };
    return () => d("div", {
      class: [
        "form-check form-switch",
        {
          "form-check-reverse": e.reverse,
          [`form-switch-${e.size}`]: e.size,
          "is-invalid": e.invalid,
          "is-valid": e.valid
        }
      ]
    }, [
      d("input", {
        ...t,
        ...e.modelValue && { checked: e.modelValue },
        class: [
          "form-check-input",
          {
            "is-invalid": e.invalid,
            "is-valid": e.valid
          }
        ],
        id: e.id,
        onChange: (a) => r(a),
        type: e.type
      }),
      e.label && d($e, {
        ...e.id && { for: e.id },
        class: "form-check-label"
      }, {
        default: () => e.label
      })
    ]);
  }
});
g({
  name: "CFormTextarea",
  props: {
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedback: String,
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.3.0
     */
    feedbackInvalid: String,
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    feedbackValid: String,
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.3.0
     */
    floatingLabel: String,
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id: String,
    /**
     * Set component validation state to invalid.
     */
    invalid: Boolean,
    /**
     * Add a caption for a component.
     *
     * @since 4.3.0
     */
    label: String,
    /**
     * The default name for a value passed using v-model.
     */
    modelValue: String,
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText: Boolean,
    /**
     * Toggle the readonly state for the component.
     */
    readonly: Boolean,
    /**
     * Add helper text to the component.
     *
     * @since 4.3.0
     */
    text: String,
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.3.0
     */
    tooltipFeedback: Boolean,
    /**
     * Set component validation state to valid.
     */
    valid: Boolean
  },
  emits: [
    /**
     * Event occurs when the element loses focus, after the content has been changed.
     */
    "change",
    /**
     * Event occurs immediately after the value of a component has changed.
     */
    "input",
    /**
     * Emit the new value whenever there’s an input or change event.
     */
    "update:modelValue"
  ],
  setup(e, { attrs: t, emit: n, slots: r }) {
    const a = (o) => {
      const l = o.target;
      n("change", o), n("update:modelValue", l.value);
    }, i = (o) => {
      const l = o.target;
      n("input", o), n("update:modelValue", l.value);
    };
    return () => d(Pt, {
      describedby: t["aria-describedby"],
      feedback: e.feedback,
      feedbackInvalid: e.feedbackInvalid,
      feedbackValid: e.feedbackValid,
      floatingLabel: e.floatingLabel,
      id: e.id,
      invalid: e.invalid,
      label: e.label,
      text: e.text,
      tooltipFeedback: e.tooltipFeedback,
      valid: e.valid
    }, {
      default: () => d("textarea", {
        id: e.id,
        ...t,
        disabled: e.disabled,
        readonly: e.readonly,
        class: [
          e.plainText ? "form-control-plaintext" : "form-control",
          {
            "is-invalid": e.invalid,
            "is-valid": e.valid
          }
        ],
        onChange: (o) => a(o),
        onInput: (o) => i(o),
        ...e.modelValue && { value: e.modelValue }
      }, r.default && r.default()),
      ...r.feedback && { feedback: () => r.feedback && r.feedback() },
      ...r.feedbackInvalid && {
        feedbackInvalid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.feedbackValid && {
        feedbackValid: () => r.feedbackInvalid && r.feedbackInvalid()
      },
      ...r.label && { label: () => r.label && r.label() },
      ...r.text && { text: () => r.text && r.text() }
    });
  }
});
g({
  name: "CInputGroup",
  props: {
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "input-group",
        {
          [`input-group-${e.size}`]: e.size
        }
      ]
    }, t.default && t.default());
  }
});
g({
  name: "CInputGroupText",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "input-group-text" }, t.default && t.default());
  }
});
const br = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
], ht = g({
  name: "CCol",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xs: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    sm: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    md: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    lg: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xl: {
      type: [Boolean, Number, String, Object]
    },
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }
     */
    xxl: {
      type: [Boolean, Number, String, Object]
    }
  },
  setup(e, { slots: t }) {
    const n = [];
    return br.forEach((r) => {
      const a = e[r], i = r === "xs" ? "" : `-${r}`;
      a && ((typeof a == "number" || typeof a == "string") && n.push(`col${i}-${a}`), typeof a == "boolean" && n.push(`col${i}`)), a && typeof a == "object" && ((typeof a.span == "number" || typeof a.span == "string") && n.push(`col${i}-${a.span}`), typeof a.span == "boolean" && n.push(`col${i}`), (typeof a.order == "number" || typeof a.order == "string") && n.push(`order${i}-${a.order}`), typeof a.offset == "number" && n.push(`offset${i}-${a.offset}`));
    }), () => d("div", {
      class: [n.length > 0 ? n : "col"]
    }, t.default && t.default());
  }
}), jr = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "fluid"
];
g({
  name: "CContainer",
  props: {
    /**
     * Set container 100% wide until small breakpoint.
     */
    sm: Boolean,
    /**
     * Set container 100% wide until medium breakpoint.
     */
    md: Boolean,
    /**
     * Set container 100% wide until large breakpoint.
     */
    lg: Boolean,
    /**
     * Set container 100% wide until X-large breakpoint.
     */
    xl: Boolean,
    /**
     * Set container 100% wide until XX-large breakpoint.
     */
    xxl: Boolean,
    /**
     * Set container 100% wide, spanning the entire width of the viewport.
     */
    fluid: Boolean
  },
  setup(e, { slots: t }) {
    const n = [];
    return jr.forEach((r) => {
      e[r] && n.push(`container-${r}`);
    }), () => d("div", {
      class: [n.length > 0 ? n : "container"]
    }, t.default && t.default());
  }
});
const wr = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
g({
  name: "CRow",
  props: {
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xs: Object,
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    sm: Object,
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    md: Object,
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    lg: Object,
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xl: Object,
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @values { cols: 'auto' | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }
     */
    xxl: Object
  },
  setup(e, { slots: t }) {
    const n = [];
    return wr.forEach((r) => {
      const a = e[r], i = r === "xs" ? "" : `-${r}`;
      typeof a == "object" && (a.cols && n.push(`row-cols${i}-${a.cols}`), typeof a.gutter == "number" && n.push(`g${i}-${a.gutter}`), typeof a.gutterX == "number" && n.push(`gx${i}-${a.gutterX}`), typeof a.gutterY == "number" && n.push(`gy${i}-${a.gutterY}`));
    }), () => d("div", {
      class: ["row", n]
    }, t.default && t.default());
  }
});
g({
  name: "CHeader",
  props: {
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(e)
    },
    /**
     * Place header in non-static positions.
     *
     * @values 'fixed', 'sticky'
     */
    position: {
      type: String,
      validator: (e) => ["fixed", "sticky"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d("div", { class: ["header", { [`header-${e.position}`]: e.position }] }, e.container ? d("div", { class: `container${e.container === !0 ? "" : "-" + e.container}` }, t.default && t.default()) : t.default && t.default());
  }
});
g({
  name: "CHeaderBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "header-brand" }, t.default && t.default());
  }
});
g({
  name: "CHeaderDivider",
  setup(e, { slots: t }) {
    return () => d("div", { class: "header-divider" }, t.default && t.default());
  }
});
g({
  name: "CHeaderNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: "header-nav",
      role: "navigation"
    }, t.default && t.default());
  }
});
g({
  name: "CHeaderText",
  setup(e, { slots: t }) {
    return () => d("span", { class: "header-text" }, t.default && t.default());
  }
});
g({
  name: "CHeaderToggler",
  setup(e, { slots: t }) {
    return () => d("button", {
      class: "header-toggler",
      type: "button",
      "aria-label": "Toggle navigation"
    }, t.default ? t.default() : d("span", { class: ["header-toggler-icon"] }));
  }
});
g({
  name: "CImage",
  props: {
    /**
     * Set the horizontal aligment.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (e) => ["start", "center", "end"].includes(e)
    },
    /**
     * Make image responsive.
     */
    fluid: Boolean,
    /**
     * Make image rounded.
     */
    rounded: Boolean,
    /**
     * Give an image a rounded 1px border appearance.
     */
    thumbnail: Boolean
  },
  setup(e) {
    return () => d("img", {
      class: [
        {
          [`float-${e.align}`]: e.align && (e.align === "start" || e.align === "end"),
          "d-block mx-auto": e.align && e.align === "center",
          "img-fluid": e.fluid,
          rounded: e.rounded,
          "img-thumbnail": e.thumbnail
        }
      ]
    });
  }
});
g({
  name: "CListGroup",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<CCard>`)
     */
    flush: Boolean,
    /**
     * Specify a layout type.
     *
     * @values 'horizontal', 'horizontal-sm', 'horizontal-md', 'horizontal-lg', 'horizontal-xl', 'horizontal-xxl',
     */
    layout: {
      type: String,
      validator: (e) => [
        "horizontal",
        "horizontal-sm",
        "horizontal-md",
        "horizontal-lg",
        "horizontal-xl",
        "horizontal-xxl"
      ].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        "list-group",
        {
          "list-group-flush": e.flush,
          [`list-group-${e.layout}`]: e.layout
        }
      ]
    }, t.default && t.default());
  }
});
g({
  name: "CListGroupItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "li"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        "list-group-item",
        {
          [`list-group-item-${e.color}`]: e.color,
          "list-group-item-action": e.component === "a" || e.component === "button",
          active: e.active,
          disabled: e.disabled
        }
      ],
      ...(e.component === "a" || e.component === "button") && {
        active: e.active,
        disabled: e.disabled
      },
      ...e.active && { "aria-current": !0 },
      ...e.disabled && { "aria-disabled": !0 }
    }, t.default && t.default());
  }
});
g({
  name: "CModal",
  inheritAttrs: !1,
  props: {
    /**
     * Align the modal in the center or top of the screen.
     *
     * @values 'top', 'center'
     */
    alignment: {
      default: "top",
      validator: (e) => ["top", "center"].includes(e)
    },
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["static"].includes(e) : typeof e == "boolean"
    },
    /**
     * A string of all className you want applied to the modal content component.
     */
    contentClassName: String,
    /**
     * Set modal to covers the entire user viewport
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    fullscreen: {
      type: [Boolean, String],
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: !0
    },
    /**
     * Create a scrollable modal that allows scrolling the modal body.
     */
    scrollable: Boolean,
    /**
     * Size the component small, large, or extra large.
     *
     * @values 'sm', 'lg', 'xl'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg", "xl"].includes(e)
    },
    /**
     * Remove animation to create modal that simply appear rather than fade in to view.
     */
    transition: {
      type: Boolean,
      default: !0
    },
    /**
     * By default the component is unmounted after close animation, if you want to keep the component mounted set this property to false.
     */
    unmountOnClose: {
      type: Boolean,
      default: !0
    },
    /**
     * Toggle the visibility of alert component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be closed.
     */
    "close-prevented",
    /**
     * Callback fired when the modal is shown, its backdrop is static and a click outside the modal or an escape key press is performed with the keyboard option set to false.
     */
    "show"
  ],
  setup(e, { slots: t, attrs: n, emit: r }) {
    const a = k(), i = k(), o = k(e.visible);
    K(() => e.visible, () => {
      o.value = e.visible;
    });
    const l = (m, b) => {
      Y(() => b(), m), document.body.classList.add("modal-open"), document.body.style.overflow = "hidden", document.body.style.paddingRight = "0px", m.style.display = "block", setTimeout(() => {
        m.classList.add("show");
      }, 1), r("show");
    }, s = () => {
      window.addEventListener("mousedown", v), window.addEventListener("keyup", h);
    }, c = (m, b) => {
      Y(() => b(), m), document.body.classList.remove("modal-open"), document.body.style.removeProperty("overflow"), document.body.style.removeProperty("padding-right"), document.body.className === "" && document.body.removeAttribute("class"), m.classList.remove("show");
    }, u = (m) => {
      window.removeEventListener("mousedown", v), window.removeEventListener("keyup", h), m.style.display = "none";
    }, f = () => {
      r("close"), o.value = !1;
    }, h = (m) => {
      i.value && !i.value.contains(m.target) && (e.backdrop !== "static" && m.key === "Escape" && e.keyboard && f(), e.backdrop === "static" && (a.value.classList.add("modal-static"), r("close-prevented"), setTimeout(() => {
        a.value.classList.remove("modal-static");
      }, 300)));
    }, v = (m) => {
      window.addEventListener("mouseup", () => y(m), { once: !0 });
    }, y = (m) => {
      i.value && !i.value.contains(m.target) && (e.backdrop !== "static" && f(), e.backdrop === "static" && (a.value.classList.add("modal-static"), setTimeout(() => {
        a.value.classList.remove("modal-static");
      }, 300)));
    };
    N("handleDismiss", f);
    const p = () => d("div", {
      class: [
        "modal",
        {
          fade: e.transition
        },
        n.class
      ],
      ref: a
    }, d("div", {
      class: [
        "modal-dialog",
        {
          "modal-dialog-centered": e.alignment === "center",
          [`modal-fullscreen-${e.fullscreen}-down`]: e.fullscreen && typeof e.fullscreen == "string",
          "modal-fullscreen": e.fullscreen && typeof e.fullscreen == "boolean",
          "modal-dialog-scrollable": e.scrollable,
          [`modal-${e.size}`]: e.size
        }
      ],
      role: "dialog"
    }, d("div", { class: ["modal-content", e.contentClassName], ref: i }, t.default && t.default())));
    return () => [
      d(ue, {
        css: !1,
        onEnter: (m, b) => l(m, b),
        onAfterEnter: () => s(),
        onLeave: (m, b) => c(m, b),
        onAfterLeave: (m) => u(m)
      }, () => e.unmountOnClose ? o.value && p() : oe(p(), [[pe, o.value]])),
      e.backdrop && d(Ot, {
        class: "modal-backdrop",
        visible: o.value
      })
    ];
  }
});
g({
  name: "CModalBody",
  setup(e, { slots: t }) {
    return () => d("div", { class: "modal-body" }, t.default && t.default());
  }
});
g({
  name: "CModalFooter",
  setup(e, { slots: t }) {
    return () => d("div", { class: "modal-footer" }, t.default && t.default());
  }
});
g({
  name: "CModalHeader",
  props: {
    /**
     * Add a close button component to the header.
     */
    closeButton: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { slots: t }) {
    const n = L("handleDismiss");
    return () => d("span", { class: "modal-header" }, [
      t.default && t.default(),
      e.closeButton && d(tt, { onClick: () => n() }, "")
    ]);
  }
});
g({
  name: "CModalTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "modal-title" }, t.default && t.default());
  }
});
g({
  name: "CNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    },
    /**
     * Specify a layout type for component.
     *
     * @values 'fill', 'justified'
     */
    layout: {
      type: String,
      validator: (e) => ["fill", "justified"].includes(e)
    },
    /**
     * Set the nav variant to tabs or pills.
     *
     * @values 'tabs', 'pills'
     */
    variant: {
      type: String,
      validator: (e) => ["tabs", "pills"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        "nav",
        {
          [`nav-${e.layout}`]: e.layout,
          [`nav-${e.variant}`]: e.variant
        }
      ],
      role: "navigation"
    }, t.default && t.default());
  }
});
g({
  name: "CNavGroup",
  props: {
    /**
     * Make nav group more compact by cutting all `padding` in half.
     */
    compact: Boolean,
    /**
     * Show nav group items.
     */
    visible: Boolean
  },
  emits: ["visible-change"],
  setup(e, { slots: t, emit: n }) {
    const r = k(), a = k(), i = k(), o = (p, m) => {
      p ? i.value = m : i.value === m && (i.value = 0);
    }, l = (p) => i.value === p;
    Ue(() => {
      r.value = e.visible, e.visible && a.value.classList.add("show"), n("visible-change", r.value);
    }), K(() => e.visible, () => {
      r.value = e.visible, r.value === !1 && (i.value = void 0);
    }), K(r, () => {
      n("visible-change", r.value);
    });
    const s = () => {
      r.value = !r.value, n("visible-change", r.value);
    }, c = (p) => {
      p.style.height = "0px", a.value.classList.add("show");
    }, u = (p, m) => {
      Y(() => m(), p), p.style.height = `${p.scrollHeight}px`;
    }, f = (p) => {
      p.style.height = "auto";
    }, h = (p) => {
      p.style.height = `${p.scrollHeight}px`;
    }, v = (p, m) => {
      Y(() => m(), p), setTimeout(() => {
        p.style.height = "0px";
      }, 1);
    }, y = () => {
      a.value.classList.remove("show");
    };
    return () => d("li", {
      class: "nav-group",
      ref: a
    }, [
      t.togglerContent && d("a", {
        class: ["nav-link", "nav-group-toggle"],
        onClick: s
      }, t.togglerContent && t.togglerContent()),
      d(ue, {
        css: !1,
        onBeforeEnter: (p) => c(p),
        onEnter: (p, m) => u(p, m),
        onAfterEnter: (p) => f(p),
        onBeforeLeave: (p) => h(p),
        onLeave: (p, m) => v(p, m),
        onAfterLeave: () => y()
      }, {
        default: () => r.value && d("ul", {
          class: [
            "nav-group-items",
            {
              compact: e.compact
            }
          ]
        }, t.default && t.default().map((p, m) => p.type.name === "CNavGroup" ? d(p, {
          onVisibleChange: (b) => o(b, m + 1),
          ...i.value && { visible: l(m + 1) }
        }) : p))
      })
    ]);
  }
});
g({
  name: "CNavGroupItems",
  setup(e, { slots: t }) {
    return () => d("ul", { class: "nav-group-items" }, t.default && t.default());
  }
});
const rn = g({
  name: "CNavLink",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * @ignore
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => d(ct, {
      class: "nav-link",
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    });
  }
});
g({
  name: "CNavItem",
  props: {
    ...rn.props
  },
  setup(e, { slots: t }) {
    return () => d("li", {
      class: "nav-item"
    }, e.href ? d(rn, {
      active: e.active,
      component: e.component,
      disabled: e.disabled,
      href: e.href
    }, {
      default: () => t.default && t.default()
    }) : t.default && t.default());
  }
});
g({
  name: "CNavTitle",
  setup(e, { slots: t }) {
    return () => d("li", { class: "nav-title" }, t.default && t.default());
  }
});
g({
  name: "CNavbar",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E,
    /**
     * Sets if the color of text should be colored for a light or dark dark background.
     *
     * @values 'dark', 'light'
     */
    colorScheme: {
      type: String,
      validator: (e) => ["dark", "light"].includes(e)
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "nav"
    },
    /**
     * Defines optional container wrapping children elements.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'
     */
    container: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl", "fluid"].includes(e)
    },
    /**
     * Defines the responsive breakpoint to determine when content collapses.
     *
     * @values boolean, 'sm', 'md', 'lg', 'xl', 'xxl'
     */
    expand: {
      type: [Boolean, String],
      validator: (e) => typeof e == "boolean" || ["sm", "md", "lg", "xl", "xxl"].includes(e)
    },
    /**
     * Place component in non-static positions.
     *
     * @values 'fixed-top', 'fixed-bottom', 'sticky-top'
     */
    placement: {
      type: String,
      validator: (e) => ["fixed-top", "fixed-bottom", "sticky-top"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: [
        "navbar",
        {
          [`bg-${e.color}`]: e.color,
          [`navbar-${e.colorScheme}`]: e.colorScheme,
          [typeof e.expand == "boolean" ? "navbar-expand" : `navbar-expand-${e.expand}`]: e.expand
        },
        e.placement
      ]
    }, e.container ? d("div", { class: [`container${e.container === !0 ? "" : "-" + e.container}`] }, t.default && t.default()) : t.default && t.default());
  }
});
g({
  name: "CNavbarBrand",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     *
     */
    component: {
      type: String,
      default: "a"
    },
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => d(e.component ?? (e.href ? "a" : "span"), {
      class: "navbar-brand",
      href: e.href
    }, t.default && t.default());
  }
});
g({
  name: "CNavbarNav",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "ul"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, {
      class: "navbar-nav",
      role: "navigation"
    }, t.default && t.default());
  }
});
g({
  name: "CNavbarText",
  setup(e, { slots: t }) {
    return () => d("span", { class: "navbar-text" }, t.default && t.default());
  }
});
g({
  name: "CNavbarToggler",
  setup(e, { slots: t }) {
    return () => d("button", {
      class: "navbar-toggler"
    }, t.default ? t.default() : d("span", { class: ["navbar-toggler-icon"] }));
  }
});
g({
  name: "COffcanvas",
  props: {
    /**
     * Apply a backdrop on body while offcanvas is open.
     *
     * @values boolean | 'static'
     */
    backdrop: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["static"].includes(e) : typeof e == "boolean"
    },
    /**
     * Closes the offcanvas when escape key is pressed.
     */
    keyboard: {
      type: Boolean,
      default: !0
    },
    /**
     * Components placement, there’s no default placement.
     *
     * @values 'start', 'end', 'top', 'bottom'
     */
    placement: {
      type: String,
      require: !0,
      validator: (e) => ["start", "end", "top", "bottom"].includes(e)
    },
    /**
     * Responsive offcanvas property hide content outside the viewport from a specified breakpoint and down.
     *
     * @values boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
     * @since 4.7.0
     */
    responsive: {
      type: [Boolean, String],
      default: !0,
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Allow body scrolling while offcanvas is open
     */
    scroll: {
      type: Boolean,
      default: !1
    },
    /**
     * Toggle the visibility of offcanvas component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(), a = k(e.visible);
    K(() => e.visible, () => {
      a.value = e.visible;
    }), K(a, () => {
      if (a.value && !e.scroll) {
        document.body.style.overflow = "hidden", document.body.style.paddingRight = "0px";
        return;
      }
      e.scroll || (document.body.style.removeProperty("overflow"), document.body.style.removeProperty("padding-right"));
    });
    const i = (h, v) => {
      n("show"), Y(() => v(), h), setTimeout(() => {
        h.classList.add("show");
      }, 1);
    }, o = () => {
      r.value.focus();
    }, l = (h, v) => {
      Y(() => v(), h), h.classList.add("hiding");
    }, s = (h) => {
      h.classList.remove("show", "hiding");
    }, c = () => {
      a.value = !1, n("hide");
    }, u = () => {
      e.backdrop !== "static" && c();
    }, f = (h) => {
      h.key === "Escape" && e.keyboard && c();
    };
    return () => [
      d(ue, {
        css: !1,
        onEnter: (h, v) => i(h, v),
        onAfterEnter: () => o(),
        onLeave: (h, v) => l(h, v),
        onAfterLeave: (h) => s(h)
      }, () => oe(d("div", {
        class: [
          {
            [`offcanvas${typeof e.responsive == "boolean" ? "" : "-" + e.responsive}`]: e.responsive,
            [`offcanvas-${e.placement}`]: e.placement
          }
        ],
        onKeydown: (h) => f(h),
        ref: r,
        role: "dialog",
        tabindex: -1
      }, t.default && t.default()), [[hn, e.visible]])),
      e.backdrop && d(Ot, {
        class: "offcanvas-backdrop",
        onClick: u,
        visible: a.value
      })
    ];
  }
});
g({
  name: "COffcanvasBody",
  setup(e, { slots: t }) {
    return () => d("div", { class: "offcanvas-body" }, t.default && t.default());
  }
});
g({
  name: "COffcanvasHeader",
  setup(e, { slots: t }) {
    return () => d("div", { class: "offcanvas-header" }, t.default && t.default());
  }
});
g({
  name: "COffcanvasTitle",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "h5"
    }
  },
  setup(e, { slots: t }) {
    return () => d(e.component, { class: "offcanvas-title" }, t.default && t.default());
  }
});
g({
  name: "CPagination",
  props: {
    /**
     * Set the alignment of pagination components.
     *
     * @values 'start', 'center', 'end'
     */
    align: {
      type: String,
      validator: (e) => ["start", "center", "end"].includes(e)
    },
    /**
     * Size the component small or large.
     *
     * @values 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg"].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d("nav", {}, d("ul", {
      class: [
        "pagination",
        {
          [`justify-content-${e.align}`]: e.align,
          [`pagination-${e.size}`]: e.size
        }
      ]
    }, t.default && t.default()));
  }
});
g({
  name: "CPaginationItem",
  props: {
    /**
     * Toggle the active state for the component.
     */
    active: Boolean,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    /**
     * Toggle the disabled state for the component.
     */
    disabled: Boolean,
    /**
     * The href attribute specifies the URL of the page the link goes to.
     */
    href: String
  },
  setup(e, { slots: t }) {
    return () => {
      const n = e.component ?? (e.active ? "span" : "a");
      return d("li", {
        class: [
          "page-item",
          {
            active: e.active,
            disabled: e.disabled
          }
        ],
        ...e.active && { active: e.active, "aria-current": "page" }
      }, n === "a" ? d(ct, {
        class: ["page-link"],
        component: n,
        href: e.href
      }, {
        default: () => t.default && t.default()
      }) : d(n, { class: ["page-link"] }, t.default && t.default()));
    };
  }
});
const Cr = [
  "xxl",
  "xl",
  "lg",
  "md",
  "sm",
  "xs"
];
g({
  name: "CPlaceholder",
  props: {
    /**
     * Set animation type to better convey the perception of something being actively loaded.
     *
     * @values 'glow', 'wave'
     */
    animation: {
      type: String,
      validator: (e) => ["glow", "wave"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "span"
    },
    /**
     * Size the component extra small, small, or large.
     *
     * @values 'xs', 'sm', 'lg'
     */
    size: {
      type: String,
      validator: (e) => ["xs", "sm", "lg"].includes(e)
    },
    /**
     * The number of columns on extra small devices (<576px).
     */
    xs: Number,
    /**
     * The number of columns on small devices (<768px).
     */
    sm: Number,
    /**
     * The number of columns on medium devices (<992px).
     */
    md: Number,
    /**
     * The number of columns on large devices (<1200px).
     */
    lg: Number,
    /**
     * The number of columns on X-Large devices (<1400px).
     */
    xl: Number,
    /**
     * The number of columns on XX-Large devices (≥1400px).
     */
    xxl: Number
  },
  setup(e, { slots: t }) {
    const n = [];
    return Cr.forEach((r) => {
      const a = e[r], i = r === "xs" ? "" : `-${r}`;
      typeof a == "number" && n.push(`col${i}-${a}`), typeof a == "boolean" && n.push(`col${i}`);
    }), () => d(e.component, {
      class: [
        e.animation ? `placeholder-${e.animation}` : "placeholder",
        {
          [`bg-${e.color}`]: e.color,
          [`placeholder-${e.size}`]: e.size
        },
        n
      ]
    }, t.default && t.default());
  }
});
const on = g({
  name: "CProgressBar",
  props: {
    /**
     * Use to animate the stripes right to left via CSS3 animations.
     */
    animated: Boolean,
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * The percent to progress the ProgressBar.
     */
    value: {
      type: Number,
      default: 0
    },
    /**
     * Set the progress bar variant to optional striped.
     *
     * @values 'striped'
     */
    variant: {
      type: String,
      validator: (e) => e === "striped"
    }
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "progress-bar",
        `bg-${e.color}`,
        {
          [`progress-bar-${e.variant}`]: e.variant,
          "progress-bar-animated": e.animated
        }
      ],
      role: "progressbar",
      style: `width: ${e.value}%`,
      "aria-valuenow": e.value,
      "aria-valuemin": "0",
      "aria-valuemax": "100"
    }, t.default && t.default());
  }
}), Tn = g({
  name: "CProgress",
  props: {
    /**
     * Sets the height of the component. If you set that value the inner `<CProgressBar>` will automatically resize accordingly.
     */
    height: Number,
    /**
     * Makes progress bar thinner.
     */
    thin: Boolean,
    /**
     * Change the default color to white.
     */
    white: Boolean,
    ...on.props
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "progress",
        {
          "progress-thin": e.thin,
          "progress-white": e.white
        }
      ],
      ...(e.height, { style: `height: ${e.height}px` })
    }, e.value ? d(on, {
      value: e.value,
      animated: e.animated,
      color: e.color,
      variant: e.variant
    }, t.default && t.default()) : t.default && t.default());
  }
});
g({
  name: "CPopover",
  props: {
    /**
     * Apply a CSS fade transition to the popover.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: !0
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (e) => typeof e == "string" ? ["top", "right", "bottom", "left"].includes(e) : Array.isArray(e) ? e.every((t) => ["top", "right", "bottom", "left"].includes(t)) : !1
    },
    /**
     * Offset of the popover relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 8]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (e) => ["top", "right", "bottom", "left"].includes(e)
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: "click",
      validator: (e) => typeof e == "string" ? ["click", "focus", "hover"].includes(e) : Array.isArray(e) ? e.every((t) => ["click", "focus", "hover"].includes(t)) : !1
    },
    /**
     * Toggle the visibility of popover component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, slots: n, emit: r }) {
    const a = k(), i = k(), o = k(e.visible), { initPopper: l, destroyPopper: s } = It(), c = typeof e.delay == "number" ? { show: e.delay, hide: e.delay } : e.delay, u = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".popover-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: e.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: mn(e.placement, a.value)
    }, f = (y, p) => {
      r("show"), l(a.value, i.value, u), y.classList.add("show"), Y(() => p(), y);
    }, h = (y, p) => {
      r("hide"), y.classList.remove("show"), Y(() => {
        p(), s();
      }, y);
    }, v = (y, p) => {
      if (a.value = y.target, p) {
        setTimeout(() => {
          o.value = !0;
        }, c.show);
        return;
      }
      setTimeout(() => {
        o.value = !1;
      }, c.hide);
    };
    return () => [
      d(vn, {
        to: "body"
      }, d(ue, {
        onEnter: (y, p) => f(y, p),
        onLeave: (y, p) => h(y, p)
      }, () => o.value && d("div", {
        class: [
          "popover",
          "bs-popover-auto",
          {
            fade: e.animation
          }
        ],
        ref: i,
        role: "tooltip",
        ...t
      }, [
        d("div", { class: "popover-arrow" }),
        (e.title || n.title) && d("div", { class: "popover-header" }, {
          default: () => n.title && n.title() || e.title
        }),
        (e.content || n.content) && d("div", { class: "popover-body" }, {
          default: () => n.content && n.content() || e.content
        })
      ]))),
      n.toggler && n.toggler({
        on: {
          click: (y) => e.trigger.includes("click") && v(y, !o.value),
          blur: (y) => e.trigger.includes("focus") && v(y, !1),
          focus: (y) => e.trigger.includes("focus") && v(y, !0),
          mouseenter: (y) => e.trigger.includes("hover") && v(y, !0),
          mouseleave: (y) => e.trigger.includes("hover") && v(y, !1)
        }
      })
    ];
  }
});
const ln = (e) => {
  if (e)
    return !!getComputedStyle(e).getPropertyValue("--cui-is-mobile");
};
g({
  name: "CSidebar",
  props: {
    /**
     * Make sidebar narrow.
     */
    narrow: Boolean,
    /**
     * Set sidebar to overlaid variant.
     */
    overlaid: Boolean,
    /**
     * Place sidebar in non-static positions.
     */
    position: {
      type: String,
      validator: (e) => ["fixed"].includes(e)
    },
    /**
     * Size the component small, large, or extra large.
     */
    size: {
      type: String,
      validator: (e) => ["sm", "lg", "xl"].includes(e)
    },
    /**
     * Expand narrowed sidebar on hover.
     */
    unfoldable: Boolean,
    /**
     * Toggle the visibility of sidebar component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show",
    /**
     * Event emitted after visibility of component changed.
     */
    "visible-change"
  ],
  setup(e, { attrs: t, slots: n, emit: r }) {
    const a = k(), i = k(), o = k(), l = k(e.visible);
    K(i, () => {
      r("visible-change", i.value), i.value ? r("show") : r("hide");
    }), K(() => e.visible, () => l.value = e.visible), K(a, () => {
      a.value && l.value && (l.value = !1);
    }), Ue(() => {
      a.value = ln(o.value), i.value = Se(o.value), window.addEventListener("resize", c), window.addEventListener("mouseup", f), window.addEventListener("keyup", u), o.value.addEventListener("mouseup", h), o.value.addEventListener("transitionend", () => {
        i.value = Se(o.value);
      });
    }), ta(() => {
      window.removeEventListener("resize", c), window.removeEventListener("mouseup", f), window.removeEventListener("keyup", u), o.value.removeEventListener("mouseup", h), o.value.removeEventListener("transitionend", () => {
        i.value = Se(o.value);
      });
    });
    const s = () => {
      l.value = !1, r("visible-change", !1);
    }, c = () => {
      a.value = ln(o.value), i.value = Se(o.value);
    }, u = (v) => {
      a.value && !o.value.contains(v.target) && s();
    }, f = (v) => {
      a.value && !o.value.contains(v.target) && s();
    }, h = (v) => {
      const y = v.target;
      y && y.classList.contains("nav-link") && !y.classList.contains("nav-group-toggle") && a.value && s();
    };
    return () => [
      d("div", {
        class: [
          "sidebar",
          {
            "sidebar-narrow": e.narrow,
            "sidebar-overlaid": e.overlaid,
            [`sidebar-${e.position}`]: e.position,
            [`sidebar-${e.size}`]: e.size,
            "sidebar-narrow-unfoldable": e.unfoldable,
            show: l.value === !0 && a.value,
            hide: l.value === !1 && !a.value
          },
          t.class
        ],
        ref: o
      }, n.default && n.default()),
      a.value && d(Ot, {
        class: "sidebar-backdrop d-none",
        visible: e.visible,
        onClick: () => s()
      })
    ];
  }
});
g({
  name: "CSidebarBrand",
  setup(e, { slots: t }) {
    return () => d("div", { class: "sidebar-brand" }, t.default && t.default());
  }
});
g({
  name: "CSidebarFooter",
  setup(e, { slots: t }) {
    return () => d("div", { class: "sidebar-footer" }, t.default && t.default());
  }
});
g({
  name: "CSidebarHeader",
  setup(e, { slots: t }) {
    return () => d("div", { class: "sidebar-header" }, t.default && t.default());
  }
});
g({
  name: "CSidebarNav",
  setup(e, { slots: t }) {
    const n = k(), r = (i, o) => {
      i ? n.value = o : n.value === o && (n.value = 0);
    }, a = (i) => n.value === i;
    return () => d("ul", {
      class: "sidebar-nav"
    }, t.default && t.default().map((i, o) => i.type.name === "CNavGroup" ? d(i, {
      onVisibleChange: (l) => r(l, o + 1),
      ...n.value && { visible: a(o + 1) }
    }) : i));
  }
});
g({
  name: "CSidebarToggler",
  setup(e, { slots: t }) {
    return () => d("button", { class: "sidebar-toggler" }, t.default && t.default());
  }
});
g({
  name: "CSpinner",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: {
      type: String,
      validator: (e) => [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light"
      ].includes(e)
    },
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: {
      type: String,
      default: "div"
    },
    /**
     * Size the component small.
     *
     * @values 'sm'
     */
    size: {
      type: String,
      validator: (e) => e === "sm"
    },
    /**
     * Set the button variant to an outlined button or a ghost button.
     *
     * @values 'border', 'grow'
     */
    variant: {
      type: String,
      default: "border",
      validator: (e) => ["border", "grow"].includes(e)
    },
    /**
     * Set visually hidden label for accessibility purposes.
     */
    visuallyHiddenLabel: {
      type: String,
      default: "Loading..."
    }
  },
  setup(e) {
    return () => d(e.component, {
      class: [
        `spinner-${e.variant}`,
        {
          [`spinner-${e.variant}-${e.size}`]: e.size,
          [`text-${e.color}`]: e.color
        }
      ],
      role: "status"
    }, d("span", { class: ["visually-hidden"] }, e.visuallyHiddenLabel));
  }
});
const Sr = g({
  name: "CTableBody",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("tbody", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), kr = g({
  name: "CTableCaption",
  setup(e, { slots: t }) {
    return () => d("caption", {}, t.default && t.default());
  }
}), sn = g({
  name: "CTableDataCell",
  props: {
    /**
     * Highlight a table row or cell.
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E,
    /**
     * @ignore
     */
    scope: String
  },
  setup(e, { slots: t }) {
    return () => d(e.scope ? "th" : "td", {
      class: [
        {
          [`align-${e.align}`]: e.align,
          "table-active": e.active,
          [`table-${e.color}`]: e.color
        }
      ],
      ...e.scope && { scope: e.scope }
    }, t.default && t.default());
  }
}), Or = g({
  name: "CTableFoot",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("tfoot", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), Mr = g({
  name: "CTableHead",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("thead", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), Ar = g({
  name: "CTableHeaderCell",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("th", {
      class: [
        {
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), mt = g({
  name: "CTableRow",
  props: {
    /**
     * Highlight a table row or cell..
     */
    active: Boolean,
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E
  },
  setup(e, { slots: t }) {
    return () => d("tr", {
      class: [
        {
          [`align-${e.align}`]: e.align,
          "table-active": e.active,
          [`table-${e.color}`]: e.color
        }
      ]
    }, t.default && t.default());
  }
}), cn = (e) => e.replace(/[-_.]/g, " ").replace(/ +/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" "), Er = (e) => typeof e == "object" ? e.label ?? cn(e.key) : cn(e), Br = (e, t) => e ? e.map((n) => typeof n == "object" ? n.key : n) : t && Tr(t), Tr = (e) => Object.keys(e[0] || {}).filter((t) => t.charAt(0) !== "_");
g({
  name: "CTable",
  props: {
    /**
     * Set the vertical aligment.
     *
     * @values 'bottom', 'middle', 'top'
     */
    align: {
      type: String,
      validator: (e) => ["bottom", "middle", "top"].includes(e)
    },
    /**
     * Sets the border color of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    borderColor: E,
    /**
     * Add borders on all sides of the table and cells.
     */
    bordered: Boolean,
    /**
     * Remove borders on all sides of the table and cells.
     */
    borderless: Boolean,
    /**
     * Put the `<caption>` on the top of the table.
     *
     * @values 'top' | string
     */
    caption: String,
    /**
     * Set the text of the table caption and the caption on the top of the table.
     *
     * @since 4.5.0
     */
    captionTop: String,
    /**
     * Prop for table columns configuration. If prop is not defined, table will display columns based on the first item keys, omitting keys that begins with underscore (e.g. '_props')
     *
     * In columns prop each array item represents one column. Item might be specified in two ways:
     * String: each item define column name equal to item value.
     * Object: item is object with following keys available as column configuration:
     * - key (required)(String) - define column name equal to item key.
     * - label (String) - define visible label of column. If not defined, label will be generated automatically based on column name, by converting kebab-case and snake_case to individual words and capitalization of each word.
     * - _props (Object) - adds classes to all cels in column, ex. _props: { scope: 'col', className: 'custom-class' },
     * - _style (Object) - adds styles to the column header (useful for defining widths)
     *
     * @since 4.5.0
     */
    columns: {
      type: Array
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values  'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E,
    /**
     * Array of objects or strings, where each element represents one cell in the table footer.
     *
     * Example items:
     * ['FooterCell', 'FooterCell', 'FooterCell']
     * or
     * [{ label: 'FooterCell', _props: { color: 'success' }, ...]
     *
     * @since 4.5.0
     */
    footer: {
      type: Array
    },
    /**
     * Enable a hover state on table rows within a `<CTableBody>`.
     */
    hover: Boolean,
    /**
     * Array of objects, where each object represents one item - row in table. Additionally, you can add style classes to each row by passing them by '_props' key and to single cell by '_cellProps'.
     *
     * Example item:
     * { name: 'John' , age: 12, _props: { color: 'success' }, _cellProps: { age: { className: 'fw-bold'}}}
     *
     * @since 4.5.0
     */
    items: {
      type: Array
    },
    responsive: {
      type: [Boolean, String],
      validator: (e) => typeof e == "string" ? ["sm", "md", "lg", "xl", "xxl"].includes(e) : typeof e == "boolean"
    },
    /**
     * Make table more compact by cutting all cell `padding` in half.
     */
    small: Boolean,
    /**
     * Add zebra-striping to any table row within the `<CTableBody>`.
     */
    striped: Boolean,
    /**
     * Add zebra-striping to any table column.
     *
     * @since 4.4.0
     */
    stripedColumns: Boolean,
    /**
     * Properties that will be passed to the table footer component.
     *
     * Properties to [CTableFoot](#ctablefoot) component.
     * @since 4.5.0
     */
    tableFootProps: {
      type: Object
    },
    /**
     * Properties that will be passed to the table head component.
     *
     *  Properties to [CTableHead](#ctablehead) component.
     * @since 4.5.0
     */
    tableHeadProps: {
      type: Object
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = Me(() => Br(e.columns, e.items)), a = () => d("table", {
      class: [
        "table",
        {
          [`align-${e.align}`]: e.align,
          "caption-top": e.captionTop || e.caption === "top",
          [`border-${e.borderColor}`]: e.borderColor,
          "table-bordered": e.bordered,
          "table-borderless": e.borderless,
          [`table-${e.color}`]: e.color,
          "table-hover": e.hover,
          "table-sm": e.small,
          "table-striped": e.striped,
          "table-striped-columns": e.stripedColumns
        },
        n.class
      ]
    }, {
      default: () => [
        (e.caption && e.caption !== "top" || e.captionTop) && d(kr, {}, {
          default: () => e.caption || e.captionTop
        }),
        e.columns && d(Mr, {
          ...e.tableHeadProps
        }, {
          default: () => d(mt, {}, {
            default: () => [
              e.columns && e.columns.map((i) => d(Ar, {
                ...typeof i == "object" && i._props && { ...i._props },
                ...typeof i == "object" && i._style && { style: { ...i._style } }
              }, {
                default: () => Er(i)
              }))
            ]
          })
        }),
        e.items && d(Sr, {}, {
          default: () => [
            e.items && e.items.map((i) => d(mt, {
              ...i._props && { ...i._props }
            }, {
              default: () => [
                r.value && r.value.map((o) => i[o] !== void 0 && d(sn, {
                  ...i._cellProps && i._cellProps.all && { ...i._cellProps.all },
                  ...i._cellProps && i._cellProps[o] && {
                    ...i._cellProps[o]
                  }
                }, {
                  default: () => i[o]
                }))
              ]
            }))
          ]
        }),
        t.default && t.default(),
        e.footer && d(Or, {
          ...e.tableFootProps
        }, {
          default: () => d(mt, {}, {
            default: () => [
              e.footer && e.footer.map((i) => d(sn, {
                ...typeof i == "object" && i._props && { ...i._props }
              }, {
                default: () => typeof i == "object" ? i.label : i
              }))
            ]
          })
        })
      ]
    });
    return () => [
      e.responsive ? d("div", {
        class: typeof e.responsive == "boolean" ? "table-responsive" : `table-responsive-${e.responsive}`
      }, a()) : a()
    ];
  }
});
g({
  name: "CTabContent",
  setup(e, { slots: t }) {
    return () => d("div", { class: "tab-content" }, t.default && t.default());
  }
});
g({
  name: "CTabPane",
  props: {
    /**
     * Toggle the visibility of component.
     */
    visible: {
      type: Boolean,
      default: !1
    }
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(), a = k(!0), i = (l, s) => {
      a.value = !1, n("show"), setTimeout(() => {
        Y(() => s(), l), l.classList.add("show");
      }, 1);
    }, o = (l, s) => {
      a.value = !1, n("hide"), l.classList.remove("show"), Y(() => s(), l);
    };
    return () => d(ue, {
      onEnter: (l, s) => i(l, s),
      onLeave: (l, s) => o(l, s)
    }, () => oe(d("div", {
      class: [
        "tab-pane",
        "fade",
        {
          active: e.visible,
          show: a.value && e.visible
        }
      ],
      ref: r
    }, t.default && t.default()), [[pe, e.visible]]));
  }
});
g({
  name: "CToast",
  props: {
    /**
     * Auto hide the toast.
     */
    autohide: {
      type: Boolean,
      default: !0
    },
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', string
     */
    color: E,
    /**
     * Delay hiding the toast (ms).
     */
    delay: {
      type: Number,
      default: 5e3
    },
    /**
     * Optionally add a close button to component and allow it to self dismiss.
     */
    dismissible: {
      type: Boolean,
      default: !0
    },
    /**
     * index of the component.
     */
    index: Number,
    /**
     * Title node for your component.
     */
    title: String,
    /**
     * Toggle the visibility of component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be closed.
     */
    "close",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = k(0), a = k();
    return N("updateVisible", (o) => {
      a.value = o;
    }), Ue(() => {
      e.visible && (a.value = e.visible), e.autohide && (clearTimeout(r.value), r.value = window.setTimeout(() => {
        a.value = !1, n("close");
      }, e.delay));
    }), () => d(ue, {
      appear: !0,
      enterFromClass: "",
      enterActiveClass: "show showing",
      enterToClass: "show",
      leaveFromClass: "show",
      leaveActiveClass: "show showing",
      leaveToClass: "show",
      onAfterEnter: (o) => {
        o.classList.add("show"), e.index ? n("show", e.index) : n("show");
      },
      onAfterLeave: () => {
        e.index ? n("close", e.index) : n("close");
      }
    }, {
      default: () => a.value && d("div", {
        class: [
          "toast fade",
          {
            [`bg-${e.color}`]: e.color
          }
        ],
        "aria-live": "assertive",
        "aria-atomic": !0,
        role: "alert"
      }, t.default && t.default())
    });
  }
});
g({
  name: "CToastBody",
  setup(e, { slots: t }) {
    return () => d("div", { class: "toast-body" }, t.default && t.default());
  }
});
const Vr = g({
  name: "CToastClose",
  props: {
    /**
     * Component used for the root node. Either a string to use a HTML element or a component.
     */
    component: String,
    ...tt.props
  },
  emits: [
    /**
     * Event called before the dissmiss animation has started.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    const r = L("updateVisible"), a = () => {
      n("close"), r(!1);
    };
    return () => e.component ? d(e.component, {
      onClick: () => {
        a();
      }
    }, () => t.default && t.default()) : d(tt, {
      ...e,
      onClick: () => {
        a();
      }
    });
  }
});
g({
  name: "CToaster",
  props: {
    /**
     * Describes the placement of component.
     *
     * @values 'top-start', 'top', 'top-end', 'middle-start', 'middle', 'middle-end', 'bottom-start', 'bottom', 'bottom-end'
     */
    placement: {
      type: String,
      validator: (e) => [
        "top-start",
        "top-center",
        "top-end",
        "middle-start",
        "middle-center",
        "middle-end",
        "bottom-start",
        "bottom-center",
        "bottom-end"
      ].includes(e)
    }
  },
  setup(e, { slots: t }) {
    return () => d("div", {
      class: [
        "toaster toast-container p-3",
        {
          "position-fixed": e.placement,
          "top-0": e.placement && e.placement.includes("top"),
          "top-50 translate-middle-y": e.placement && e.placement.includes("middle"),
          "bottom-0": e.placement && e.placement.includes("bottom"),
          "start-0": e.placement && e.placement.includes("start"),
          "start-50 translate-middle-x": e.placement && e.placement.includes("center"),
          "end-0": e.placement && e.placement.includes("end")
        }
      ]
    }, t.default && t.default());
  }
});
g({
  name: "CToastHeader",
  props: {
    /**
     * Automatically add a close button to the header.
     */
    closeButton: Boolean
  },
  emits: [
    /**
     * Event called after clicking the close button.
     */
    "close"
  ],
  setup(e, { slots: t, emit: n }) {
    return () => d("div", { class: "toast-header" }, [
      t.default && t.default(),
      e.closeButton && d(Vr, {
        onClose: () => n("close")
      })
    ]);
  }
});
g({
  name: "CTooltip",
  props: {
    /**
     * Apply a CSS fade transition to the tooltip.
     *
     * @since 4.9.0
     */
    animation: {
      type: Boolean,
      default: !0
    },
    /**
     * Content for your component. If you want to pass non-string value please use dedicated slot `<template #content>...</template>`
     */
    content: String,
    /**
     * The delay for displaying and hiding the popover (in milliseconds). When a numerical value is provided, the delay applies to both the hide and show actions. The object structure for specifying the delay is as follows: delay: `{ 'show': 500, 'hide': 100 }`.
     *
     * @since 4.9.0
     */
    delay: {
      type: [Number, Object],
      default: 0
    },
    /**
     * Specify the desired order of fallback placements by providing a list of placements as an array. The placements should be prioritized based on preference.
     *
     * @since 4.9.0
     */
    fallbackPlacements: {
      type: [String, Array],
      default: () => ["top", "right", "bottom", "left"],
      validator: (e) => typeof e == "string" ? ["top", "right", "bottom", "left"].includes(e) : Array.isArray(e) ? e.every((t) => ["top", "right", "bottom", "left"].includes(t)) : !1
    },
    /**
     * Offset of the tooltip relative to its target.
     */
    offset: {
      type: Array,
      default: () => [0, 6]
    },
    /**
     * Describes the placement of your component after Popper.js has applied all the modifiers that may have flipped or altered the originally provided placement property.
     */
    placement: {
      type: String,
      default: "top",
      validator: (e) => ["top", "right", "bottom", "left"].includes(e)
    },
    /**
     * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
     *
     * @values 'click', 'focus', 'hover'
     */
    trigger: {
      type: [String, Array],
      default: () => ["hover", "focus"],
      validator: (e) => typeof e == "string" ? ["click", "focus", "hover"].includes(e) : Array.isArray(e) ? e.every((t) => ["click", "focus", "hover"].includes(t)) : !1
    },
    /**
     * Toggle the visibility of tooltip component.
     */
    visible: Boolean
  },
  emits: [
    /**
     * Callback fired when the component requests to be hidden.
     */
    "hide",
    /**
     * Callback fired when the component requests to be shown.
     */
    "show"
  ],
  setup(e, { attrs: t, slots: n, emit: r }) {
    const a = k(), i = k(), o = k(e.visible), { initPopper: l, destroyPopper: s } = It(), c = typeof e.delay == "number" ? { show: e.delay, hide: e.delay } : e.delay, u = {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: ".tooltip-arrow"
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: e.fallbackPlacements
          }
        },
        {
          name: "offset",
          options: {
            offset: e.offset
          }
        }
      ],
      placement: mn(e.placement, a.value)
    }, f = (y, p) => {
      r("show"), l(a.value, i.value, u), y.classList.add("show"), Y(() => p(), y);
    }, h = (y, p) => {
      r("hide"), y.classList.remove("show"), Y(() => {
        p(), s();
      }, y);
    }, v = (y, p) => {
      if (a.value = y.target, p) {
        setTimeout(() => {
          o.value = !0;
        }, c.show);
        return;
      }
      setTimeout(() => {
        o.value = !1;
      }, c.hide);
    };
    return () => [
      d(vn, {
        to: "body"
      }, d(ue, {
        onEnter: (y, p) => f(y, p),
        onLeave: (y, p) => h(y, p)
      }, () => o.value && d("div", {
        class: [
          "tooltip",
          "bs-tooltip-auto",
          {
            fade: e.animation
          }
        ],
        ref: i,
        role: "tooltip",
        ...t
      }, [
        d("div", { class: "tooltip-arrow" }),
        (e.content || n.content) && d("div", { class: "tooltip-inner" }, {
          default: () => n.content && n.content() || e.content
        })
      ]))),
      n.toggler && n.toggler({
        on: {
          click: (y) => e.trigger.includes("click") && v(y, !o.value),
          blur: (y) => e.trigger.includes("focus") && v(y, !1),
          focus: (y) => e.trigger.includes("focus") && v(y, !0),
          mouseenter: (y) => e.trigger.includes("hover") && v(y, !0),
          mouseleave: (y) => e.trigger.includes("hover") && v(y, !1)
        }
      })
    ];
  }
});
g({
  name: "CWidgetStatsA",
  props: {
    color: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for action component, ex. `<CDropdown>`.
   *
   * @slot action
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => d(ze, {
      class: [
        { [`bg-${e.color}`]: e.color, "text-high-emphasis-inverse": e.color }
      ]
    }, () => [
      d(He, {
        class: "pb-0 d-flex justify-content-between align-items-start"
      }, () => [
        d("div", {}, [
          (e.value || t.value) && d("div", { class: "fs-4 fw-semibold" }, {
            default: () => t.value && t.value() || e.value
          }),
          (e.title || t.title) && d("div", {}, {
            default: () => t.title && t.title() || e.title
          })
        ]),
        /**
         * @slot Location for action component, ex. `<CDropdown>`.
         */
        t.action && t.action()
      ]),
      /**
       * @slot Location for chart component.
       */
      t.chart && t.chart(),
      t.default && t.default()
    ]);
  }
});
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
function dn(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function $r(e) {
  var t, n;
  return dn(e) === !1 ? !1 : (t = e.constructor, t === void 0 ? !0 : (n = t.prototype, !(dn(n) === !1 || n.hasOwnProperty("isPrototypeOf") === !1)));
}
function Ke() {
  return Ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ke.apply(this, arguments);
}
function Vn(e, t) {
  if (e == null)
    return {};
  var n, r, a = {}, i = Object.keys(e);
  for (r = 0; r < i.length; r++)
    t.indexOf(n = i[r]) >= 0 || (a[n] = e[n]);
  return a;
}
const wt = { silent: !1, logLevel: "warn" }, Ir = ["validator"], $n = Object.prototype, In = $n.toString, Pr = $n.hasOwnProperty, Pn = /^\s*function (\w+)/;
function un(e) {
  var t;
  const n = (t = e == null ? void 0 : e.type) !== null && t !== void 0 ? t : e;
  if (n) {
    const r = n.toString().match(Pn);
    return r ? r[1] : "";
  }
  return "";
}
const we = $r, Ln = (e) => e;
let $ = Ln;
process.env.NODE_ENV !== "production" && ($ = typeof console < "u" ? function(t, n = wt.logLevel) {
  wt.silent === !1 && console[n](`[VueTypes warn]: ${t}`);
} : Ln);
const Ie = (e, t) => Pr.call(e, t), Lr = Number.isInteger || function(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}, Pe = Array.isArray || function(e) {
  return In.call(e) === "[object Array]";
}, Le = (e) => In.call(e) === "[object Function]", at = (e, t) => we(e) && Ie(e, "_vueTypes_name") && (!t || e._vueTypes_name === t), zn = (e) => we(e) && (Ie(e, "type") || ["_vueTypes_name", "validator", "default", "required"].some((t) => Ie(e, t)));
function Lt(e, t) {
  return Object.defineProperty(e.bind(t), "__original", { value: e });
}
function Ce(e, t, n = !1) {
  let r, a = !0, i = "";
  r = we(e) ? e : { type: e };
  const o = at(r) ? r._vueTypes_name + " - " : "";
  if (zn(r) && r.type !== null) {
    if (r.type === void 0 || r.type === !0 || !r.required && t == null)
      return a;
    Pe(r.type) ? (a = r.type.some((l) => Ce(l, t, !0) === !0), i = r.type.map((l) => un(l)).join(" or ")) : (i = un(r), a = i === "Array" ? Pe(t) : i === "Object" ? we(t) : i === "String" || i === "Number" || i === "Boolean" || i === "Function" ? function(l) {
      if (l == null)
        return "";
      const s = l.constructor.toString().match(Pn);
      return s ? s[1].replace(/^Async/, "") : "";
    }(t) === i : t instanceof r.type);
  }
  if (!a) {
    const l = `${o}value "${t}" should be of type "${i}"`;
    return n === !1 ? ($(l), !1) : l;
  }
  if (Ie(r, "validator") && Le(r.validator)) {
    const l = $, s = [];
    if ($ = (c) => {
      s.push(c);
    }, a = r.validator(t), $ = l, !a) {
      const c = (s.length > 1 ? "* " : "") + s.join(`
* `);
      return s.length = 0, n === !1 ? ($(c), a) : c;
    }
  }
  return a;
}
function _(e, t) {
  const n = Object.defineProperties(t, { _vueTypes_name: { value: e, writable: !0 }, isRequired: { get() {
    return this.required = !0, this;
  } }, def: { value(a) {
    return a === void 0 ? this.type === Boolean || Array.isArray(this.type) && this.type.includes(Boolean) ? void (this.default = void 0) : (Ie(this, "default") && delete this.default, this) : Le(a) || Ce(this, a, !0) === !0 ? (this.default = Pe(a) ? () => [...a] : we(a) ? () => Object.assign({}, a) : a, this) : ($(`${this._vueTypes_name} - invalid default value: "${a}"`), this);
  } } }), { validator: r } = n;
  return Le(r) && (n.validator = Lt(r, n)), n;
}
function ce(e, t) {
  const n = _(e, t);
  return Object.defineProperty(n, "validate", { value(r) {
    return Le(this.validator) && $(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`), this.validator = Lt(r, this), this;
  } });
}
function fn(e, t, n) {
  const r = function(s) {
    const c = {};
    return Object.getOwnPropertyNames(s).forEach((u) => {
      c[u] = Object.getOwnPropertyDescriptor(s, u);
    }), Object.defineProperties({}, c);
  }(t);
  if (r._vueTypes_name = e, !we(n))
    return r;
  const { validator: a } = n, i = Vn(n, Ir);
  if (Le(a)) {
    let { validator: s } = r;
    s && (s = (l = (o = s).__original) !== null && l !== void 0 ? l : o), r.validator = Lt(s ? function(c) {
      return s.call(this, c) && a.call(this, c);
    } : a, r);
  }
  var o, l;
  return Object.assign(r, i);
}
function ut(e) {
  return e.replace(/^(?!\s*$)/gm, "  ");
}
const zr = () => ce("any", {}), Hr = () => ce("function", { type: Function }), pn = () => ce("boolean", { type: Boolean }), Rr = () => ce("string", { type: String }), Nr = () => ce("number", { type: Number }), Dr = () => ce("array", { type: Array }), Fr = () => ce("object", { type: Object }), Kr = () => _("integer", { type: Number, validator(e) {
  const t = Lr(e);
  return t === !1 && $(`integer - "${e}" is not an integer`), t;
} }), Wr = () => _("symbol", { validator(e) {
  const t = typeof e == "symbol";
  return t === !1 && $(`symbol - invalid value "${e}"`), t;
} }), Gr = () => Object.defineProperty({ type: null, validator(e) {
  const t = e === null;
  return t === !1 && $("nullable - value should be null"), t;
} }, "_vueTypes_name", { value: "nullable" });
function Ur(e, t = "custom validation failed") {
  if (typeof e != "function")
    throw new TypeError("[VueTypes error]: You must provide a function as argument");
  return _(e.name || "<<anonymous function>>", { type: null, validator(n) {
    const r = e(n);
    return r || $(`${this._vueTypes_name} - ${t}`), r;
  } });
}
function Yr(e) {
  if (!Pe(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument.");
  const t = `oneOf - value should be one of "${e.map((r) => typeof r == "symbol" ? r.toString() : r).join('", "')}".`, n = { validator(r) {
    const a = e.indexOf(r) !== -1;
    return a || $(t), a;
  } };
  if (e.indexOf(null) === -1) {
    const r = e.reduce((a, i) => {
      if (i != null) {
        const o = i.constructor;
        a.indexOf(o) === -1 && a.push(o);
      }
      return a;
    }, []);
    r.length > 0 && (n.type = r);
  }
  return _("oneOf", n);
}
function Xr(e) {
  if (!Pe(e))
    throw new TypeError("[VueTypes error]: You must provide an array as argument");
  let t = !1, n = !1, r = [];
  for (let i = 0; i < e.length; i += 1) {
    const o = e[i];
    if (zn(o)) {
      if (Le(o.validator) && (t = !0), at(o, "oneOf") && o.type) {
        r = r.concat(o.type);
        continue;
      }
      if (at(o, "nullable")) {
        n = !0;
        continue;
      }
      if (o.type === !0 || !o.type) {
        $('oneOfType - invalid usage of "true" and "null" as types.');
        continue;
      }
      r = r.concat(o.type);
    } else
      r.push(o);
  }
  r = r.filter((i, o) => r.indexOf(i) === o);
  const a = n === !1 && r.length > 0 ? r : null;
  return _("oneOfType", t ? { type: a, validator(i) {
    const o = [], l = e.some((s) => {
      const c = Ce(s, i, !0);
      return typeof c == "string" && o.push(c), c === !0;
    });
    return l || $(`oneOfType - provided value does not match any of the ${o.length} passed-in validators:
${ut(o.join(`
`))}`), l;
  } } : { type: a });
}
function _r(e) {
  return _("arrayOf", { type: Array, validator(t) {
    let n = "";
    const r = t.every((a) => (n = Ce(e, a, !0), n === !0));
    return r || $(`arrayOf - value validation error:
${ut(n)}`), r;
  } });
}
function Jr(e) {
  return _("instanceOf", { type: e });
}
function Zr(e) {
  return _("objectOf", { type: Object, validator(t) {
    let n = "";
    const r = Object.keys(t).every((a) => (n = Ce(e, t[a], !0), n === !0));
    return r || $(`objectOf - value validation error:
${ut(n)}`), r;
  } });
}
function zt(e) {
  const t = Object.keys(e), n = t.filter((a) => {
    var i;
    return !((i = e[a]) === null || i === void 0 || !i.required);
  }), r = _("shape", { type: Object, validator(a) {
    if (!we(a))
      return !1;
    const i = Object.keys(a);
    if (n.length > 0 && n.some((o) => i.indexOf(o) === -1)) {
      const o = n.filter((l) => i.indexOf(l) === -1);
      return $(o.length === 1 ? `shape - required property "${o[0]}" is not defined.` : `shape - required properties "${o.join('", "')}" are not defined.`), !1;
    }
    return i.every((o) => {
      if (t.indexOf(o) === -1)
        return this._vueTypes_isLoose === !0 || ($(`shape - shape definition does not include a "${o}" property. Allowed keys: "${t.join('", "')}".`), !1);
      const l = Ce(e[o], a[o], !0);
      return typeof l == "string" && $(`shape - "${o}" property validation error:
 ${ut(l)}`), l === !0;
    });
  } });
  return Object.defineProperty(r, "_vueTypes_isLoose", { writable: !0, value: !1 }), Object.defineProperty(r, "loose", { get() {
    return this._vueTypes_isLoose = !0, this;
  } }), r;
}
const Qr = ["name", "validate", "getter"], qr = /* @__PURE__ */ (() => {
  var e;
  return (e = class {
    static get any() {
      return zr();
    }
    static get func() {
      return Hr().def(this.defaults.func);
    }
    static get bool() {
      return this.defaults.bool === void 0 ? pn() : pn().def(this.defaults.bool);
    }
    static get string() {
      return Rr().def(this.defaults.string);
    }
    static get number() {
      return Nr().def(this.defaults.number);
    }
    static get array() {
      return Dr().def(this.defaults.array);
    }
    static get object() {
      return Fr().def(this.defaults.object);
    }
    static get integer() {
      return Kr().def(this.defaults.integer);
    }
    static get symbol() {
      return Wr();
    }
    static get nullable() {
      return Gr();
    }
    static extend(t) {
      if ($("VueTypes.extend is deprecated. Use the ES6+ method instead. See https://dwightjack.github.io/vue-types/advanced/extending-vue-types.html#extending-namespaced-validators-in-es6 for details."), Pe(t))
        return t.forEach((s) => this.extend(s)), this;
      const { name: n, validate: r = !1, getter: a = !1 } = t, i = Vn(t, Qr);
      if (Ie(this, n))
        throw new TypeError(`[VueTypes error]: Type "${n}" already defined`);
      const { type: o } = i;
      if (at(o))
        return delete i.type, Object.defineProperty(this, n, a ? { get: () => fn(n, o, i) } : { value(...s) {
          const c = fn(n, o, i);
          return c.validator && (c.validator = c.validator.bind(c, ...s)), c;
        } });
      let l;
      return l = a ? { get() {
        const s = Object.assign({}, i);
        return r ? ce(n, s) : _(n, s);
      }, enumerable: !0 } : { value(...s) {
        const c = Object.assign({}, i);
        let u;
        return u = r ? ce(n, c) : _(n, c), c.validator && (u.validator = c.validator.bind(u, ...s)), u;
      }, enumerable: !0 }, Object.defineProperty(this, n, l);
    }
  }).defaults = {}, e.sensibleDefaults = void 0, e.config = wt, e.custom = Ur, e.oneOf = Yr, e.instanceOf = Jr, e.oneOfType = Xr, e.arrayOf = _r, e.objectOf = Zr, e.shape = zt, e.utils = { validate: (t, n) => Ce(n, t, !0) === !0, toType: (t, n, r = !1) => r ? ce(t, n) : _(t, n) }, e;
})();
function ei(e = { func: () => {
}, bool: !0, string: "", number: 0, array: () => [], object: () => ({}), integer: 0 }) {
  var t;
  return (t = class extends qr {
    static get sensibleDefaults() {
      return Ke({}, this.defaults);
    }
    static set sensibleDefaults(n) {
      this.defaults = n !== !1 ? Ke({}, n !== !0 ? n : e) : {};
    }
  }).defaults = Ke({}, e), t;
}
class Vi extends ei() {
}
g({
  name: "CWidgetStatsB",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: zt({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: E,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  setup(e, { slots: t }) {
    return () => d(ze, {
      class: [
        {
          "text-high-emphasis-inverse": e.inverse
        }
      ],
      color: e.color
    }, () => d(He, {
      class: "card-body"
    }, () => [
      (e.value || t.value) && d("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      (e.title || t.title) && d("div", {}, {
        default: () => t.title && t.title() || e.title
      }),
      d(Tn, {
        class: "my-2",
        ...e.progress && e.progress.color && { color: e.progress.color },
        height: 4,
        ...e.progress && e.progress.value && { value: e.progress.value },
        white: e.inverse
      }),
      (e.text || t.text) && d("small", {
        class: [
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => t.text && t.text() || e.text
      })
    ]));
  }
});
g({
  name: "CWidgetStatsC",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse: Boolean,
    progress: zt({
      /**
       * Sets the color context of the progress bar to one of CoreUI’s themed colors
       *
       * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
       */
      color: E,
      /**
       * The percent to progress the ProgressBar (out of 100).
       */
      value: {
        type: Number,
        default: 0
      }
    }),
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(e, { slots: t }) {
    return () => d(ze, {
      class: [
        {
          "text-white": e.inverse
        }
      ],
      color: e.color
    }, () => d(He, {
      class: "card-body"
    }, () => [
      t.icon && d("div", {
        class: [
          "text-end mb-4",
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, t.icon && t.icon()),
      (e.value || t.value) && d("div", {
        class: "fs-4 fw-semibold"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      (e.title || t.title) && d("div", {
        class: [
          "text-uppercase fw-semibold small",
          e.inverse ? "text-medium-emphasis-inverse" : "text-medium-emphasis"
        ]
      }, {
        default: () => t.title && t.title() || e.title
      }),
      d(Tn, {
        class: "my-2",
        ...e.progress && e.progress.color && { color: e.progress.color },
        height: 4,
        ...e.progress && e.progress.value && { value: e.progress.value },
        white: e.inverse
      })
    ]));
  }
});
g({
  name: "CWidgetStatsD",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Values and titles for your component.
     */
    values: {
      type: Array,
      default: () => []
    }
  },
  /**
   * Location for icon component, ex. `<CDropdown>`.
   *
   * @slot icon
   */
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => d(ze, {}, {
      default: () => [
        d(da, {
          class: [
            "position-relative d-flex justify-content-center align-items-center",
            {
              [`bg-${e.color}`]: e.color
            }
          ]
        }, () => [t.icon && t.icon(), t.chart && t.chart()]),
        d(He, {
          class: "row text-center"
        }, {
          default: () => e.values && e.values.map((n, r) => [
            r % 2 !== 0 && d("div", { class: "vr" }),
            d(ht, {}, {
              default: () => [
                d(ht, { class: "fs-5 fw-semibold" }, () => n.value),
                d(ht, { class: "text-uppercase text-medium-emphasis small" }, () => n.title)
              ]
            })
          ])
        })
      ]
    });
  }
});
g({
  name: "CWidgetStatsE",
  props: {
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for chart component.
   *
   * @slot chart
   */
  setup(e, { slots: t }) {
    return () => d(ze, {}, () => d(He, {
      class: "text-center"
    }, () => [
      (e.title || t.title) && d("div", {
        class: "text-muted small text-uppercase font-weight-bold"
      }, {
        default: () => t.title && t.title() || e.title
      }),
      (e.value || t.value) && d("div", {
        class: "h2 py-3"
      }, {
        default: () => t.value && t.value() || e.value
      }),
      t.chart && t.chart(),
      t.default && t.default()
    ]));
  }
});
g({
  name: "CWidgetStatsF",
  props: {
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @values 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'
     */
    color: E,
    /**
     * Set padding of your component.
     */
    padding: {
      type: Boolean,
      default: !0
    },
    /**
     * Title for your component. If you want to pass non-string value please use dedicated slot `<template #title>...</template>`
     */
    title: String,
    /**
     * Helper text for your component. If you want to pass non-string value please use dedicated slot `<template #text>...</template>`
     */
    text: String,
    /**
     * Value for your component. If you want to pass non-string or non-number value please use dedicated slot `<template #value>...</template>`
     */
    value: {
      type: [Number, String],
      default: 0
    }
  },
  /**
   * Location for icon component.
   *
   * @slot icon
   */
  setup(e, { slots: t }) {
    return () => d(ze, {}, {
      default: () => [
        d(He, {
          class: ["d-flex align-items-center", e.padding === !1 && "p-0"]
        }, () => [
          d("div", {
            class: [
              "me-3",
              "text-white",
              `bg-${e.color}`,
              e.padding ? "p-3" : "p-4"
            ]
          }, t.default && t.default() || t.icon && t.icon()),
          d("div", {}, [
            (e.value || t.value) && d("div", {
              class: [`fs-6 fw-semibold text-${e.color}`]
            }, {
              default: () => t.value && t.value() || e.value
            }),
            (e.title || t.title) && d("div", {
              class: "text-medium-emphasis text-uppercase fw-semibold small"
            }, {
              default: () => t.title && t.title() || e.title
            })
          ])
        ]),
        t.footer && d(ca, {}, () => t.footer && t.footer())
      ]
    });
  }
});
var ti = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ni(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Hn = { exports: {} };
(function(e, t) {
  (function(r, a) {
    e.exports = a();
  })(typeof self < "u" ? self : ti, function() {
    return (
      /******/
      function(n) {
        var r = {};
        function a(i) {
          if (r[i])
            return r[i].exports;
          var o = r[i] = {
            /******/
            i,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return n[i].call(o.exports, o, o.exports, a), o.l = !0, o.exports;
        }
        return a.m = n, a.c = r, a.d = function(i, o, l) {
          a.o(i, o) || Object.defineProperty(i, o, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: l
            /******/
          });
        }, a.r = function(i) {
          Object.defineProperty(i, "__esModule", { value: !0 });
        }, a.n = function(i) {
          var o = i && i.__esModule ? (
            /******/
            function() {
              return i.default;
            }
          ) : (
            /******/
            function() {
              return i;
            }
          );
          return a.d(o, "a", o), o;
        }, a.o = function(i, o) {
          return Object.prototype.hasOwnProperty.call(i, o);
        }, a.p = "", a(a.s = 0);
      }({
        /***/
        "./dist/icons.json": (
          /*!*************************!*\
            !*** ./dist/icons.json ***!
            \*************************/
          /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, aperture, archive, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, award, bar-chart-2, bar-chart, battery-charging, battery, bell-off, bell, bluetooth, bold, book-open, book, bookmark, box, briefcase, calendar, camera-off, camera, cast, check-circle, check-square, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, chrome, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-off, cloud-rain, cloud-snow, cloud, code, codepen, codesandbox, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, divide-circle, divide-square, divide, dollar-sign, download-cloud, download, dribbble, droplet, edit-2, edit-3, edit, external-link, eye-off, eye, facebook, fast-forward, feather, figma, file-minus, file-plus, file-text, file, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, grid, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, info, instagram, italic, key, layers, layout, life-buoy, link-2, link, linkedin, list, loader, lock, log-in, log-out, mail, map-pin, map, maximize-2, maximize, meh, menu, message-circle, message-square, mic-off, mic, minimize-2, minimize, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation-2, navigation, octagon, package, paperclip, pause-circle, pause, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, pie-chart, play-circle, play, plus-circle, plus-square, plus, pocket, power, printer, radio, refresh-ccw, refresh-cw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, server, settings, share-2, share, shield-off, shield, shopping-bag, shopping-cart, shuffle, sidebar, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, square, star, stop-circle, sun, sunrise, sunset, table, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash-2, trash, trello, trending-down, trending-up, triangle, truck, tv, twitch, twitter, type, umbrella, underline, unlock, upload-cloud, upload, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume-1, volume-2, volume-x, volume, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
          /***/
          function(n) {
            n.exports = { activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>', airplay: '<path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon>', "alert-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>', "alert-triangle": '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>', "align-center": '<line x1="18" y1="10" x2="6" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="18" y1="18" x2="6" y2="18"></line>', "align-justify": '<line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line>', "align-left": '<line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line>', "align-right": '<line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="7" y2="18"></line>', anchor: '<circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>', aperture: '<circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>', archive: '<polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line>', "arrow-down-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line>', "arrow-down-left": '<line x1="17" y1="7" x2="7" y2="17"></line><polyline points="17 17 7 17 7 7"></polyline>', "arrow-down-right": '<line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>', "arrow-down": '<line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline>', "arrow-left-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line>', "arrow-left": '<line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', "arrow-right-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>', "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>', "arrow-up-circle": '<circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line>', "arrow-up-left": '<line x1="17" y1="17" x2="7" y2="7"></line><polyline points="7 17 7 7 17 7"></polyline>', "arrow-up-right": '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>', "arrow-up": '<line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline>', "at-sign": '<circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>', award: '<circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>', "bar-chart-2": '<line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>', "bar-chart": '<line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>', "battery-charging": '<path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path><line x1="23" y1="13" x2="23" y2="11"></line><polyline points="11 6 7 12 13 12 9 18"></polyline>', battery: '<rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line>', "bell-off": '<path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line>', bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>', bluetooth: '<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>', bold: '<path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>', "book-open": '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>', book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>', bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>', box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>', calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>', "camera-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path>', camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>', cast: '<path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"></path><line x1="2" y1="20" x2="2.01" y2="20"></line>', "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', "check-square": '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>', check: '<polyline points="20 6 9 17 4 12"></polyline>', "chevron-down": '<polyline points="6 9 12 15 18 9"></polyline>', "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>', "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>', "chevron-up": '<polyline points="18 15 12 9 6 15"></polyline>', "chevrons-down": '<polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>', "chevrons-left": '<polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>', "chevrons-right": '<polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>', "chevrons-up": '<polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline>', chrome: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>', circle: '<circle cx="12" cy="12" r="10"></circle>', clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>', clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>', "cloud-drizzle": '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="8" y1="13" x2="8" y2="15"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="16" y1="13" x2="16" y2="15"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="12" y1="15" x2="12" y2="17"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-lightning": '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>', "cloud-off": '<path d="M22.61 16.95A5 5 0 0 0 18 10h-1.26a8 8 0 0 0-7.05-6M5 5a8 8 0 0 0 4 15h9a5 5 0 0 0 1.7-.3"></path><line x1="1" y1="1" x2="23" y2="23"></line>', "cloud-rain": '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>', "cloud-snow": '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>', cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>', code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>', codepen: '<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line>', codesandbox: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', coffee: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line>', columns: '<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>', command: '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>', compass: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>', copy: '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>', "corner-down-left": '<polyline points="9 10 4 15 9 20"></polyline><path d="M20 4v7a4 4 0 0 1-4 4H4"></path>', "corner-down-right": '<polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path>', "corner-left-down": '<polyline points="14 15 9 20 4 15"></polyline><path d="M20 4h-7a4 4 0 0 0-4 4v12"></path>', "corner-left-up": '<polyline points="14 9 9 4 4 9"></polyline><path d="M20 20h-7a4 4 0 0 1-4-4V4"></path>', "corner-right-down": '<polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>', "corner-right-up": '<polyline points="10 9 15 4 20 9"></polyline><path d="M4 20h7a4 4 0 0 0 4-4V4"></path>', "corner-up-left": '<polyline points="9 14 4 9 9 4"></polyline><path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>', "corner-up-right": '<polyline points="15 14 20 9 15 4"></polyline><path d="M4 20v-7a4 4 0 0 1 4-4h12"></path>', cpu: '<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>', "credit-card": '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line>', crop: '<path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>', crosshair: '<circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line>', database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>', delete: '<path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line>', disc: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle>', "divide-circle": '<line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line><circle cx="12" cy="12" r="10"></circle>', "divide-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line><line x1="12" y1="8" x2="12" y2="8"></line>', divide: '<circle cx="12" cy="6" r="2"></circle><line x1="5" y1="12" x2="19" y2="12"></line><circle cx="12" cy="18" r="2"></circle>', "dollar-sign": '<line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>', "download-cloud": '<polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>', download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>', dribbble: '<circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>', droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>', "edit-2": '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>', "edit-3": '<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>', edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>', "external-link": '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>', "eye-off": '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>', eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>', facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>', "fast-forward": '<polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon>', feather: '<path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line>', figma: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path>', "file-minus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line>', "file-plus": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line>', "file-text": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>', file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>', film: '<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line>', filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>', flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line>', "folder-minus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="9" y1="14" x2="15" y2="14"></line>', "folder-plus": '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>', folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>', framer: '<path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>', frown: '<circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', gift: '<polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>', "git-branch": '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path>', "git-commit": '<circle cx="12" cy="12" r="4"></circle><line x1="1.05" y1="12" x2="7" y2="12"></line><line x1="17.01" y1="12" x2="22.96" y2="12"></line>', "git-merge": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M6 21V9a9 9 0 0 0 9 9"></path>', "git-pull-request": '<circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line>', github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>', gitlab: '<path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>', globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>', grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>', "hard-drive": '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>', hash: '<line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line>', headphones: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>', heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>', "help-circle": '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>', hexagon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>', home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>', image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>', inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>', info: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>', instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>', italic: '<line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line>', key: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>', layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', layout: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line>', "life-buoy": '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>', "link-2": '<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line>', link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>', linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>', list: '<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>', loader: '<line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>', lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>', "log-in": '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>', "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>', mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>', "map-pin": '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>', map: '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>', "maximize-2": '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>', maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>', meh: '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', menu: '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>', "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>', "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>', "mic-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>', "minimize-2": '<polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline><line x1="14" y1="10" x2="21" y2="3"></line><line x1="3" y1="21" x2="10" y2="14"></line>', minimize: '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>', "minus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>', "minus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line>', minus: '<line x1="5" y1="12" x2="19" y2="12"></line>', monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>', moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>', "more-horizontal": '<circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle>', "more-vertical": '<circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>', "mouse-pointer": '<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="M13 13l6 6"></path>', move: '<polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line>', music: '<path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle>', "navigation-2": '<polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>', navigation: '<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>', octagon: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>', package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>', paperclip: '<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>', "pause-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line>', pause: '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>', "pen-tool": '<path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>', percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>', "phone-call": '<path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-forwarded": '<polyline points="19 1 23 5 19 9"></polyline><line x1="15" y1="5" x2="23" y2="5"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-incoming": '<polyline points="16 2 16 8 22 8"></polyline><line x1="23" y1="1" x2="16" y2="8"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-missed": '<line x1="23" y1="1" x2="17" y2="7"></line><line x1="17" y1="1" x2="23" y2="7"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "phone-off": '<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line>', "phone-outgoing": '<polyline points="23 7 23 1 17 1"></polyline><line x1="16" y1="8" x2="23" y2="1"></line><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>', "pie-chart": '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>', "play-circle": '<circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon>', play: '<polygon points="5 3 19 12 5 21 5 3"></polygon>', "plus-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', "plus-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>', plus: '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>', pocket: '<path d="M4 3h16a2 2 0 0 1 2 2v6a10 10 0 0 1-10 10A10 10 0 0 1 2 11V5a2 2 0 0 1 2-2z"></path><polyline points="8 10 12 14 16 10"></polyline>', power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>', printer: '<polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>', radio: '<circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>', "refresh-ccw": '<polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>', "refresh-cw": '<polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>', repeat: '<polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>', rewind: '<polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon>', "rotate-ccw": '<polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>', "rotate-cw": '<polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>', rss: '<path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle>', save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline>', scissors: '<circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line>', search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>', send: '<line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>', server: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line>', settings: '<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>', "share-2": '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>', share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line>', "shield-off": '<path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path><path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path><line x1="1" y1="1" x2="23" y2="23"></line>', shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>', "shopping-bag": '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>', "shopping-cart": '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>', shuffle: '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>', sidebar: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>', "skip-back": '<polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>', "skip-forward": '<polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>', slack: '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"></path><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"></path><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"></path><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"></path><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"></path><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"></path><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"></path>', slash: '<circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>', sliders: '<line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line>', smartphone: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', smile: '<circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line>', speaker: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><circle cx="12" cy="14" r="4"></circle><line x1="12" y1="6" x2="12.01" y2="6"></line>', square: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>', star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>', "stop-circle": '<circle cx="12" cy="12" r="10"></circle><rect x="9" y="9" width="6" height="6"></rect>', sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>', sunrise: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="9"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="8 6 12 2 16 6"></polyline>', sunset: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="9" x2="12" y2="2"></line><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"></line><line x1="1" y1="18" x2="3" y2="18"></line><line x1="21" y1="18" x2="23" y2="18"></line><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"></line><line x1="23" y1="22" x2="1" y2="22"></line><polyline points="16 5 12 9 8 5"></polyline>', table: '<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>', tablet: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>', tag: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>', target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>', terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>', thermometer: '<path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>', "thumbs-down": '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>', "thumbs-up": '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>', "toggle-left": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="8" cy="12" r="3"></circle>', "toggle-right": '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect><circle cx="16" cy="12" r="3"></circle>', tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>', "trash-2": '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>', trash: '<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', trello: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="7" y="7" width="3" height="9"></rect><rect x="14" y="7" width="3" height="5"></rect>', "trending-down": '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>', "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>', triangle: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>', truck: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>', tv: '<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline>', twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7M16 11V7"></path>', twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>', type: '<polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line>', umbrella: '<path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>', underline: '<path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line>', unlock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path>', "upload-cloud": '<polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline>', upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>', "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline>', "user-minus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line>', "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>', "user-x": '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line>', user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>', users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>', "video-off": '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line>', video: '<polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>', voicemail: '<circle cx="5.5" cy="11.5" r="4.5"></circle><circle cx="18.5" cy="11.5" r="4.5"></circle><line x1="5.5" y1="16" x2="18.5" y2="16"></line>', "volume-1": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-2": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>', "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>', volume: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>', watch: '<circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>', "wifi-off": '<line x1="1" y1="1" x2="23" y2="23"></line><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path><path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line>', wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>', "x-circle": '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-octagon": '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>', "x-square": '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line>', x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>', youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>', "zap-off": '<polyline points="12.41 6.75 13 2 10.57 4.92"></polyline><polyline points="18.57 12.91 21 10 15.66 10"></polyline><polyline points="8 8 3 14 12 14 11 22 16 16"></polyline><line x1="1" y1="1" x2="23" y2="23"></line>', zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', "zoom-in": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>', "zoom-out": '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>' };
          }
        ),
        /***/
        "./node_modules/classnames/dedupe.js": (
          /*!*******************************************!*\
            !*** ./node_modules/classnames/dedupe.js ***!
            \*******************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i, o;
            /*!
              Copyright (c) 2016 Jed Watson.
              Licensed under the MIT License (MIT), see
              http://jedwatson.github.io/classnames
            */
            (function() {
              var l = function() {
                function s() {
                }
                s.prototype = /* @__PURE__ */ Object.create(null);
                function c(b, x) {
                  for (var j = x.length, w = 0; w < j; ++w)
                    p(b, x[w]);
                }
                var u = {}.hasOwnProperty;
                function f(b, x) {
                  b[x] = !0;
                }
                function h(b, x) {
                  for (var j in x)
                    u.call(x, j) && (b[j] = !!x[j]);
                }
                var v = /\s+/;
                function y(b, x) {
                  for (var j = x.split(v), w = j.length, S = 0; S < w; ++S)
                    b[j[S]] = !0;
                }
                function p(b, x) {
                  if (x) {
                    var j = typeof x;
                    j === "string" ? y(b, x) : Array.isArray(x) ? c(b, x) : j === "object" ? h(b, x) : j === "number" && f(b, x);
                  }
                }
                function m() {
                  for (var b = arguments.length, x = Array(b), j = 0; j < b; j++)
                    x[j] = arguments[j];
                  var w = new s();
                  c(w, x);
                  var S = [];
                  for (var C in w)
                    w[C] && S.push(C);
                  return S.join(" ");
                }
                return m;
              }();
              typeof n < "u" && n.exports ? n.exports = l : (i = [], o = (function() {
                return l;
              }).apply(r, i), o !== void 0 && (n.exports = o));
            })();
          }
        ),
        /***/
        "./node_modules/core-js/es/array/from.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/es/array/from.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            a(
              /*! ../../modules/es.string.iterator */
              "./node_modules/core-js/modules/es.string.iterator.js"
            ), a(
              /*! ../../modules/es.array.from */
              "./node_modules/core-js/modules/es.array.from.js"
            );
            var i = a(
              /*! ../../internals/path */
              "./node_modules/core-js/internals/path.js"
            );
            n.exports = i.Array.from;
          }
        ),
        /***/
        "./node_modules/core-js/internals/a-function.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/a-function.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = function(a) {
              if (typeof a != "function")
                throw TypeError(String(a) + " is not a function");
              return a;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/an-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/an-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            );
            n.exports = function(o) {
              if (!i(o))
                throw TypeError(String(o) + " is not an object");
              return o;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/array-from.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/array-from.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/bind-context */
              "./node_modules/core-js/internals/bind-context.js"
            ), o = a(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), l = a(
              /*! ../internals/call-with-safe-iteration-closing */
              "./node_modules/core-js/internals/call-with-safe-iteration-closing.js"
            ), s = a(
              /*! ../internals/is-array-iterator-method */
              "./node_modules/core-js/internals/is-array-iterator-method.js"
            ), c = a(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), u = a(
              /*! ../internals/create-property */
              "./node_modules/core-js/internals/create-property.js"
            ), f = a(
              /*! ../internals/get-iterator-method */
              "./node_modules/core-js/internals/get-iterator-method.js"
            );
            n.exports = function(v) {
              var y = o(v), p = typeof this == "function" ? this : Array, m = arguments.length, b = m > 1 ? arguments[1] : void 0, x = b !== void 0, j = 0, w = f(y), S, C, O, M;
              if (x && (b = i(b, m > 2 ? arguments[2] : void 0, 2)), w != null && !(p == Array && s(w)))
                for (M = w.call(y), C = new p(); !(O = M.next()).done; j++)
                  u(
                    C,
                    j,
                    x ? l(M, b, [O.value, j], !0) : O.value
                  );
              else
                for (S = c(y.length), C = new p(S); S > j; j++)
                  u(C, j, x ? b(y[j], j) : y[j]);
              return C.length = j, C;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/array-includes.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/array-includes.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), o = a(
              /*! ../internals/to-length */
              "./node_modules/core-js/internals/to-length.js"
            ), l = a(
              /*! ../internals/to-absolute-index */
              "./node_modules/core-js/internals/to-absolute-index.js"
            );
            n.exports = function(s) {
              return function(c, u, f) {
                var h = i(c), v = o(h.length), y = l(f, v), p;
                if (s && u != u) {
                  for (; v > y; )
                    if (p = h[y++], p != p)
                      return !0;
                } else
                  for (; v > y; y++)
                    if ((s || y in h) && h[y] === u)
                      return s || y || 0;
                return !s && -1;
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/bind-context.js": (
          /*!********************************************************!*\
            !*** ./node_modules/core-js/internals/bind-context.js ***!
            \********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/a-function */
              "./node_modules/core-js/internals/a-function.js"
            );
            n.exports = function(o, l, s) {
              if (i(o), l === void 0)
                return o;
              switch (s) {
                case 0:
                  return function() {
                    return o.call(l);
                  };
                case 1:
                  return function(c) {
                    return o.call(l, c);
                  };
                case 2:
                  return function(c, u) {
                    return o.call(l, c, u);
                  };
                case 3:
                  return function(c, u, f) {
                    return o.call(l, c, u, f);
                  };
              }
              return function() {
                return o.apply(l, arguments);
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/call-with-safe-iteration-closing.js": (
          /*!****************************************************************************!*\
            !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
            \****************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            n.exports = function(o, l, s, c) {
              try {
                return c ? l(i(s)[0], s[1]) : l(s);
              } catch (f) {
                var u = o.return;
                throw u !== void 0 && i(u.call(o)), f;
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/check-correctness-of-iteration.js": (
          /*!**************************************************************************!*\
            !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
            \**************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), o = i("iterator"), l = !1;
            try {
              var s = 0, c = {
                next: function() {
                  return { done: !!s++ };
                },
                return: function() {
                  l = !0;
                }
              };
              c[o] = function() {
                return this;
              }, Array.from(c, function() {
                throw 2;
              });
            } catch {
            }
            n.exports = function(u, f) {
              if (!f && !l)
                return !1;
              var h = !1;
              try {
                var v = {};
                v[o] = function() {
                  return {
                    next: function() {
                      return { done: h = !0 };
                    }
                  };
                }, u(v);
              } catch {
              }
              return h;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/classof-raw.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/classof-raw.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            var a = {}.toString;
            n.exports = function(i) {
              return a.call(i).slice(8, -1);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/classof.js": (
          /*!***************************************************!*\
            !*** ./node_modules/core-js/internals/classof.js ***!
            \***************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), o = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), l = o("toStringTag"), s = i(function() {
              return arguments;
            }()) == "Arguments", c = function(u, f) {
              try {
                return u[f];
              } catch {
              }
            };
            n.exports = function(u) {
              var f, h, v;
              return u === void 0 ? "Undefined" : u === null ? "Null" : typeof (h = c(f = Object(u), l)) == "string" ? h : s ? i(f) : (v = i(f)) == "Object" && typeof f.callee == "function" ? "Arguments" : v;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/copy-constructor-properties.js": (
          /*!***********************************************************************!*\
            !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
            \***********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), o = a(
              /*! ../internals/own-keys */
              "./node_modules/core-js/internals/own-keys.js"
            ), l = a(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ), s = a(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            );
            n.exports = function(c, u) {
              for (var f = o(u), h = s.f, v = l.f, y = 0; y < f.length; y++) {
                var p = f[y];
                i(c, p) || h(c, p, v(u, p));
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/correct-prototype-getter.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            n.exports = !i(function() {
              function o() {
              }
              return o.prototype.constructor = null, Object.getPrototypeOf(new o()) !== o.prototype;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-iterator-constructor.js": (
          /*!***********************************************************************!*\
            !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
            \***********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ).IteratorPrototype, o = a(
              /*! ../internals/object-create */
              "./node_modules/core-js/internals/object-create.js"
            ), l = a(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), s = a(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), c = a(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), u = function() {
              return this;
            };
            n.exports = function(f, h, v) {
              var y = h + " Iterator";
              return f.prototype = o(i, { next: l(1, v) }), s(f, y, !1, !0), c[y] = u, f;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-property-descriptor.js": (
          /*!**********************************************************************!*\
            !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
            \**********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = function(a, i) {
              return {
                enumerable: !(a & 1),
                configurable: !(a & 2),
                writable: !(a & 4),
                value: i
              };
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/create-property.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/create-property.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), o = a(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), l = a(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            n.exports = function(s, c, u) {
              var f = i(c);
              f in s ? o.f(s, f, l(0, u)) : s[f] = u;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/define-iterator.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/define-iterator.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), o = a(
              /*! ../internals/create-iterator-constructor */
              "./node_modules/core-js/internals/create-iterator-constructor.js"
            ), l = a(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), s = a(
              /*! ../internals/object-set-prototype-of */
              "./node_modules/core-js/internals/object-set-prototype-of.js"
            ), c = a(
              /*! ../internals/set-to-string-tag */
              "./node_modules/core-js/internals/set-to-string-tag.js"
            ), u = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), f = a(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), h = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), v = a(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), y = a(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), p = a(
              /*! ../internals/iterators-core */
              "./node_modules/core-js/internals/iterators-core.js"
            ), m = p.IteratorPrototype, b = p.BUGGY_SAFARI_ITERATORS, x = h("iterator"), j = "keys", w = "values", S = "entries", C = function() {
              return this;
            };
            n.exports = function(O, M, A, V, B, X, I) {
              o(A, M, V);
              var Z = function(R) {
                if (R === B && H)
                  return H;
                if (!b && R in T)
                  return T[R];
                switch (R) {
                  case j:
                    return function() {
                      return new A(this, R);
                    };
                  case w:
                    return function() {
                      return new A(this, R);
                    };
                  case S:
                    return function() {
                      return new A(this, R);
                    };
                }
                return function() {
                  return new A(this);
                };
              }, le = M + " Iterator", P = !1, T = O.prototype, te = T[x] || T["@@iterator"] || B && T[B], H = !b && te || Z(B), me = M == "Array" && T.entries || te, ne, ae, fe;
              if (me && (ne = l(me.call(new O())), m !== Object.prototype && ne.next && (!v && l(ne) !== m && (s ? s(ne, m) : typeof ne[x] != "function" && u(ne, x, C)), c(ne, le, !0, !0), v && (y[le] = C))), B == w && te && te.name !== w && (P = !0, H = function() {
                return te.call(this);
              }), (!v || I) && T[x] !== H && u(T, x, H), y[M] = H, B)
                if (ae = {
                  values: Z(w),
                  keys: X ? H : Z(j),
                  entries: Z(S)
                }, I)
                  for (fe in ae)
                    (b || P || !(fe in T)) && f(T, fe, ae[fe]);
                else
                  i({ target: M, proto: !0, forced: b || P }, ae);
              return ae;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/descriptors.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/descriptors.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            n.exports = !i(function() {
              return Object.defineProperty({}, "a", { get: function() {
                return 7;
              } }).a != 7;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/document-create-element.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/document-create-element.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), l = i.document, s = o(l) && o(l.createElement);
            n.exports = function(c) {
              return s ? l.createElement(c) : {};
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/enum-bug-keys.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = [
              "constructor",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "toLocaleString",
              "toString",
              "valueOf"
            ];
          }
        ),
        /***/
        "./node_modules/core-js/internals/export.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/export.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/object-get-own-property-descriptor */
              "./node_modules/core-js/internals/object-get-own-property-descriptor.js"
            ).f, l = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), s = a(
              /*! ../internals/redefine */
              "./node_modules/core-js/internals/redefine.js"
            ), c = a(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), u = a(
              /*! ../internals/copy-constructor-properties */
              "./node_modules/core-js/internals/copy-constructor-properties.js"
            ), f = a(
              /*! ../internals/is-forced */
              "./node_modules/core-js/internals/is-forced.js"
            );
            n.exports = function(h, v) {
              var y = h.target, p = h.global, m = h.stat, b, x, j, w, S, C;
              if (p ? x = i : m ? x = i[y] || c(y, {}) : x = (i[y] || {}).prototype, x)
                for (j in v) {
                  if (S = v[j], h.noTargetGet ? (C = o(x, j), w = C && C.value) : w = x[j], b = f(p ? j : y + (m ? "." : "#") + j, h.forced), !b && w !== void 0) {
                    if (typeof S == typeof w)
                      continue;
                    u(S, w);
                  }
                  (h.sham || w && w.sham) && l(S, "sham", !0), s(x, j, S, h);
                }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/fails.js": (
          /*!*************************************************!*\
            !*** ./node_modules/core-js/internals/fails.js ***!
            \*************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = function(a) {
              try {
                return !!a();
              } catch {
                return !0;
              }
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/function-to-string.js": (
          /*!**************************************************************!*\
            !*** ./node_modules/core-js/internals/function-to-string.js ***!
            \**************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            );
            n.exports = i("native-function-to-string", Function.toString);
          }
        ),
        /***/
        "./node_modules/core-js/internals/get-iterator-method.js": (
          /*!***************************************************************!*\
            !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
            \***************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/classof */
              "./node_modules/core-js/internals/classof.js"
            ), o = a(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), l = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), s = l("iterator");
            n.exports = function(c) {
              if (c != null)
                return c[s] || c["@@iterator"] || o[i(c)];
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/global.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/global.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            (function(i) {
              var o = "object", l = function(s) {
                return s && s.Math == Math && s;
              };
              n.exports = // eslint-disable-next-line no-undef
              l(typeof globalThis == o && globalThis) || l(typeof window == o && window) || l(typeof self == o && self) || l(typeof i == o && i) || // eslint-disable-next-line no-new-func
              Function("return this")();
            }).call(this, a(
              /*! ./../../webpack/buildin/global.js */
              "./node_modules/webpack/buildin/global.js"
            ));
          }
        ),
        /***/
        "./node_modules/core-js/internals/has.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/internals/has.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            var a = {}.hasOwnProperty;
            n.exports = function(i, o) {
              return a.call(i, o);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/hidden-keys.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/hidden-keys.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = {};
          }
        ),
        /***/
        "./node_modules/core-js/internals/hide.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/hide.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), o = a(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), l = a(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            );
            n.exports = i ? function(s, c, u) {
              return o.f(s, c, l(1, u));
            } : function(s, c, u) {
              return s[c] = u, s;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/html.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/html.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = i.document;
            n.exports = o && o.documentElement;
          }
        ),
        /***/
        "./node_modules/core-js/internals/ie8-dom-define.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), o = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), l = a(
              /*! ../internals/document-create-element */
              "./node_modules/core-js/internals/document-create-element.js"
            );
            n.exports = !i && !o(function() {
              return Object.defineProperty(l("div"), "a", {
                get: function() {
                  return 7;
                }
              }).a != 7;
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/indexed-object.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/indexed-object.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), o = a(
              /*! ../internals/classof-raw */
              "./node_modules/core-js/internals/classof-raw.js"
            ), l = "".split;
            n.exports = i(function() {
              return !Object("z").propertyIsEnumerable(0);
            }) ? function(s) {
              return o(s) == "String" ? l.call(s, "") : Object(s);
            } : Object;
          }
        ),
        /***/
        "./node_modules/core-js/internals/internal-state.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/internal-state.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/native-weak-map */
              "./node_modules/core-js/internals/native-weak-map.js"
            ), o = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), l = a(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), s = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), c = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), u = a(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), f = a(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), h = o.WeakMap, v, y, p, m = function(O) {
              return p(O) ? y(O) : v(O, {});
            }, b = function(O) {
              return function(M) {
                var A;
                if (!l(M) || (A = y(M)).type !== O)
                  throw TypeError("Incompatible receiver, " + O + " required");
                return A;
              };
            };
            if (i) {
              var x = new h(), j = x.get, w = x.has, S = x.set;
              v = function(O, M) {
                return S.call(x, O, M), M;
              }, y = function(O) {
                return j.call(x, O) || {};
              }, p = function(O) {
                return w.call(x, O);
              };
            } else {
              var C = u("state");
              f[C] = !0, v = function(O, M) {
                return s(O, C, M), M;
              }, y = function(O) {
                return c(O, C) ? O[C] : {};
              }, p = function(O) {
                return c(O, C);
              };
            }
            n.exports = {
              set: v,
              get: y,
              has: p,
              enforce: m,
              getterFor: b
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-array-iterator-method.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), o = a(
              /*! ../internals/iterators */
              "./node_modules/core-js/internals/iterators.js"
            ), l = i("iterator"), s = Array.prototype;
            n.exports = function(c) {
              return c !== void 0 && (o.Array === c || s[l] === c);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-forced.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/is-forced.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            ), o = /#|\.prototype\./, l = function(h, v) {
              var y = c[s(h)];
              return y == f ? !0 : y == u ? !1 : typeof v == "function" ? i(v) : !!v;
            }, s = l.normalize = function(h) {
              return String(h).replace(o, ".").toLowerCase();
            }, c = l.data = {}, u = l.NATIVE = "N", f = l.POLYFILL = "P";
            n.exports = l;
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/is-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = function(a) {
              return typeof a == "object" ? a !== null : typeof a == "function";
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/is-pure.js": (
          /*!***************************************************!*\
            !*** ./node_modules/core-js/internals/is-pure.js ***!
            \***************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = !1;
          }
        ),
        /***/
        "./node_modules/core-js/internals/iterators-core.js": (
          /*!**********************************************************!*\
            !*** ./node_modules/core-js/internals/iterators-core.js ***!
            \**********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/object-get-prototype-of */
              "./node_modules/core-js/internals/object-get-prototype-of.js"
            ), o = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), l = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), s = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), c = a(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), u = s("iterator"), f = !1, h = function() {
              return this;
            }, v, y, p;
            [].keys && (p = [].keys(), "next" in p ? (y = i(i(p)), y !== Object.prototype && (v = y)) : f = !0), v == null && (v = {}), !c && !l(v, u) && o(v, u, h), n.exports = {
              IteratorPrototype: v,
              BUGGY_SAFARI_ITERATORS: f
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/iterators.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/iterators.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = {};
          }
        ),
        /***/
        "./node_modules/core-js/internals/native-symbol.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/native-symbol.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/fails */
              "./node_modules/core-js/internals/fails.js"
            );
            n.exports = !!Object.getOwnPropertySymbols && !i(function() {
              return !String(Symbol());
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/native-weak-map.js": (
          /*!***********************************************************!*\
            !*** ./node_modules/core-js/internals/native-weak-map.js ***!
            \***********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/function-to-string */
              "./node_modules/core-js/internals/function-to-string.js"
            ), l = i.WeakMap;
            n.exports = typeof l == "function" && /native code/.test(o.call(l));
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-create.js": (
          /*!*********************************************************!*\
            !*** ./node_modules/core-js/internals/object-create.js ***!
            \*********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), o = a(
              /*! ../internals/object-define-properties */
              "./node_modules/core-js/internals/object-define-properties.js"
            ), l = a(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            ), s = a(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = a(
              /*! ../internals/html */
              "./node_modules/core-js/internals/html.js"
            ), u = a(
              /*! ../internals/document-create-element */
              "./node_modules/core-js/internals/document-create-element.js"
            ), f = a(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), h = f("IE_PROTO"), v = "prototype", y = function() {
            }, p = function() {
              var m = u("iframe"), b = l.length, x = "<", j = "script", w = ">", S = "java" + j + ":", C;
              for (m.style.display = "none", c.appendChild(m), m.src = String(S), C = m.contentWindow.document, C.open(), C.write(x + j + w + "document.F=Object" + x + "/" + j + w), C.close(), p = C.F; b--; )
                delete p[v][l[b]];
              return p();
            };
            n.exports = Object.create || function(b, x) {
              var j;
              return b !== null ? (y[v] = i(b), j = new y(), y[v] = null, j[h] = b) : j = p(), x === void 0 ? j : o(j, x);
            }, s[h] = !0;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-define-properties.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/object-define-properties.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), o = a(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ), l = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), s = a(
              /*! ../internals/object-keys */
              "./node_modules/core-js/internals/object-keys.js"
            );
            n.exports = i ? Object.defineProperties : function(u, f) {
              l(u);
              for (var h = s(f), v = h.length, y = 0, p; v > y; )
                o.f(u, p = h[y++], f[p]);
              return u;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-define-property.js": (
          /*!******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-define-property.js ***!
            \******************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), o = a(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), l = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), s = a(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), c = Object.defineProperty;
            r.f = i ? c : function(f, h, v) {
              if (l(f), h = s(h, !0), l(v), o)
                try {
                  return c(f, h, v);
                } catch {
                }
              if ("get" in v || "set" in v)
                throw TypeError("Accessors not supported");
              return "value" in v && (f[h] = v.value), f;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-descriptor.js": (
          /*!******************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
            \******************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/descriptors */
              "./node_modules/core-js/internals/descriptors.js"
            ), o = a(
              /*! ../internals/object-property-is-enumerable */
              "./node_modules/core-js/internals/object-property-is-enumerable.js"
            ), l = a(
              /*! ../internals/create-property-descriptor */
              "./node_modules/core-js/internals/create-property-descriptor.js"
            ), s = a(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), c = a(
              /*! ../internals/to-primitive */
              "./node_modules/core-js/internals/to-primitive.js"
            ), u = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), f = a(
              /*! ../internals/ie8-dom-define */
              "./node_modules/core-js/internals/ie8-dom-define.js"
            ), h = Object.getOwnPropertyDescriptor;
            r.f = i ? h : function(y, p) {
              if (y = s(y), p = c(p, !0), f)
                try {
                  return h(y, p);
                } catch {
                }
              if (u(y, p))
                return l(!o.f.call(y, p), y[p]);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-names.js": (
          /*!*************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
            \*************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), o = a(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            ), l = o.concat("length", "prototype");
            r.f = Object.getOwnPropertyNames || function(c) {
              return i(c, l);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-own-property-symbols.js": (
          /*!***************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
            \***************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            r.f = Object.getOwnPropertySymbols;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-get-prototype-of.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), o = a(
              /*! ../internals/to-object */
              "./node_modules/core-js/internals/to-object.js"
            ), l = a(
              /*! ../internals/shared-key */
              "./node_modules/core-js/internals/shared-key.js"
            ), s = a(
              /*! ../internals/correct-prototype-getter */
              "./node_modules/core-js/internals/correct-prototype-getter.js"
            ), c = l("IE_PROTO"), u = Object.prototype;
            n.exports = s ? Object.getPrototypeOf : function(f) {
              return f = o(f), i(f, c) ? f[c] : typeof f.constructor == "function" && f instanceof f.constructor ? f.constructor.prototype : f instanceof Object ? u : null;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-keys-internal.js": (
          /*!****************************************************************!*\
            !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
            \****************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), o = a(
              /*! ../internals/to-indexed-object */
              "./node_modules/core-js/internals/to-indexed-object.js"
            ), l = a(
              /*! ../internals/array-includes */
              "./node_modules/core-js/internals/array-includes.js"
            ), s = a(
              /*! ../internals/hidden-keys */
              "./node_modules/core-js/internals/hidden-keys.js"
            ), c = l(!1);
            n.exports = function(u, f) {
              var h = o(u), v = 0, y = [], p;
              for (p in h)
                !i(s, p) && i(h, p) && y.push(p);
              for (; f.length > v; )
                i(h, p = f[v++]) && (~c(y, p) || y.push(p));
              return y;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-keys.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/internals/object-keys.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/object-keys-internal */
              "./node_modules/core-js/internals/object-keys-internal.js"
            ), o = a(
              /*! ../internals/enum-bug-keys */
              "./node_modules/core-js/internals/enum-bug-keys.js"
            );
            n.exports = Object.keys || function(s) {
              return i(s, o);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-property-is-enumerable.js": (
          /*!*************************************************************************!*\
            !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
            \*************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = {}.propertyIsEnumerable, o = Object.getOwnPropertyDescriptor, l = o && !i.call({ 1: 2 }, 1);
            r.f = l ? function(c) {
              var u = o(this, c);
              return !!u && u.enumerable;
            } : i;
          }
        ),
        /***/
        "./node_modules/core-js/internals/object-set-prototype-of.js": (
          /*!*******************************************************************!*\
            !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
            \*******************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/validate-set-prototype-of-arguments */
              "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js"
            );
            n.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
              var o = !1, l = {}, s;
              try {
                s = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set, s.call(l, []), o = l instanceof Array;
              } catch {
              }
              return function(u, f) {
                return i(u, f), o ? s.call(u, f) : u.__proto__ = f, u;
              };
            }() : void 0);
          }
        ),
        /***/
        "./node_modules/core-js/internals/own-keys.js": (
          /*!****************************************************!*\
            !*** ./node_modules/core-js/internals/own-keys.js ***!
            \****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/object-get-own-property-names */
              "./node_modules/core-js/internals/object-get-own-property-names.js"
            ), l = a(
              /*! ../internals/object-get-own-property-symbols */
              "./node_modules/core-js/internals/object-get-own-property-symbols.js"
            ), s = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            ), c = i.Reflect;
            n.exports = c && c.ownKeys || function(f) {
              var h = o.f(s(f)), v = l.f;
              return v ? h.concat(v(f)) : h;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/path.js": (
          /*!************************************************!*\
            !*** ./node_modules/core-js/internals/path.js ***!
            \************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            n.exports = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            );
          }
        ),
        /***/
        "./node_modules/core-js/internals/redefine.js": (
          /*!****************************************************!*\
            !*** ./node_modules/core-js/internals/redefine.js ***!
            \****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), l = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            ), s = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), c = a(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), u = a(
              /*! ../internals/function-to-string */
              "./node_modules/core-js/internals/function-to-string.js"
            ), f = a(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), h = f.get, v = f.enforce, y = String(u).split("toString");
            o("inspectSource", function(p) {
              return u.call(p);
            }), (n.exports = function(p, m, b, x) {
              var j = x ? !!x.unsafe : !1, w = x ? !!x.enumerable : !1, S = x ? !!x.noTargetGet : !1;
              if (typeof b == "function" && (typeof m == "string" && !s(b, "name") && l(b, "name", m), v(b).source = y.join(typeof m == "string" ? m : "")), p === i) {
                w ? p[m] = b : c(m, b);
                return;
              } else
                j ? !S && p[m] && (w = !0) : delete p[m];
              w ? p[m] = b : l(p, m, b);
            })(Function.prototype, "toString", function() {
              return typeof this == "function" && h(this).source || u.call(this);
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/require-object-coercible.js": (
          /*!********************************************************************!*\
            !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
            \********************************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            n.exports = function(a) {
              if (a == null)
                throw TypeError("Can't call method on " + a);
              return a;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/set-global.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/set-global.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/hide */
              "./node_modules/core-js/internals/hide.js"
            );
            n.exports = function(l, s) {
              try {
                o(i, l, s);
              } catch {
                i[l] = s;
              }
              return s;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/set-to-string-tag.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/object-define-property */
              "./node_modules/core-js/internals/object-define-property.js"
            ).f, o = a(
              /*! ../internals/has */
              "./node_modules/core-js/internals/has.js"
            ), l = a(
              /*! ../internals/well-known-symbol */
              "./node_modules/core-js/internals/well-known-symbol.js"
            ), s = l("toStringTag");
            n.exports = function(c, u, f) {
              c && !o(c = f ? c : c.prototype, s) && i(c, s, { configurable: !0, value: u });
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/shared-key.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/shared-key.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), o = a(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), l = i("keys");
            n.exports = function(s) {
              return l[s] || (l[s] = o(s));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/shared.js": (
          /*!**************************************************!*\
            !*** ./node_modules/core-js/internals/shared.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/set-global */
              "./node_modules/core-js/internals/set-global.js"
            ), l = a(
              /*! ../internals/is-pure */
              "./node_modules/core-js/internals/is-pure.js"
            ), s = "__core-js_shared__", c = i[s] || o(s, {});
            (n.exports = function(u, f) {
              return c[u] || (c[u] = f !== void 0 ? f : {});
            })("versions", []).push({
              version: "3.1.3",
              mode: l ? "pure" : "global",
              copyright: "© 2019 Denis Pushkarev (zloirock.ru)"
            });
          }
        ),
        /***/
        "./node_modules/core-js/internals/string-at.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/string-at.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), o = a(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            n.exports = function(l, s, c) {
              var u = String(o(l)), f = i(s), h = u.length, v, y;
              return f < 0 || f >= h ? c ? "" : void 0 : (v = u.charCodeAt(f), v < 55296 || v > 56319 || f + 1 === h || (y = u.charCodeAt(f + 1)) < 56320 || y > 57343 ? c ? u.charAt(f) : v : c ? u.slice(f, f + 2) : (v - 55296 << 10) + (y - 56320) + 65536);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-absolute-index.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), o = Math.max, l = Math.min;
            n.exports = function(s, c) {
              var u = i(s);
              return u < 0 ? o(u + c, 0) : l(u, c);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-indexed-object.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/indexed-object */
              "./node_modules/core-js/internals/indexed-object.js"
            ), o = a(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            n.exports = function(l) {
              return i(o(l));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-integer.js": (
          /*!******************************************************!*\
            !*** ./node_modules/core-js/internals/to-integer.js ***!
            \******************************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            var a = Math.ceil, i = Math.floor;
            n.exports = function(o) {
              return isNaN(o = +o) ? 0 : (o > 0 ? i : a)(o);
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-length.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/to-length.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/to-integer */
              "./node_modules/core-js/internals/to-integer.js"
            ), o = Math.min;
            n.exports = function(l) {
              return l > 0 ? o(i(l), 9007199254740991) : 0;
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-object.js": (
          /*!*****************************************************!*\
            !*** ./node_modules/core-js/internals/to-object.js ***!
            \*****************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/require-object-coercible */
              "./node_modules/core-js/internals/require-object-coercible.js"
            );
            n.exports = function(o) {
              return Object(i(o));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/to-primitive.js": (
          /*!********************************************************!*\
            !*** ./node_modules/core-js/internals/to-primitive.js ***!
            \********************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            );
            n.exports = function(o, l) {
              if (!i(o))
                return o;
              var s, c;
              if (l && typeof (s = o.toString) == "function" && !i(c = s.call(o)) || typeof (s = o.valueOf) == "function" && !i(c = s.call(o)) || !l && typeof (s = o.toString) == "function" && !i(c = s.call(o)))
                return c;
              throw TypeError("Can't convert object to primitive value");
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/uid.js": (
          /*!***********************************************!*\
            !*** ./node_modules/core-js/internals/uid.js ***!
            \***********************************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            var a = 0, i = Math.random();
            n.exports = function(o) {
              return "Symbol(".concat(o === void 0 ? "" : o, ")_", (++a + i).toString(36));
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/validate-set-prototype-of-arguments.js": (
          /*!*******************************************************************************!*\
            !*** ./node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
            \*******************************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/is-object */
              "./node_modules/core-js/internals/is-object.js"
            ), o = a(
              /*! ../internals/an-object */
              "./node_modules/core-js/internals/an-object.js"
            );
            n.exports = function(l, s) {
              if (o(l), !i(s) && s !== null)
                throw TypeError("Can't set " + String(s) + " as a prototype");
            };
          }
        ),
        /***/
        "./node_modules/core-js/internals/well-known-symbol.js": (
          /*!*************************************************************!*\
            !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
            \*************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/global */
              "./node_modules/core-js/internals/global.js"
            ), o = a(
              /*! ../internals/shared */
              "./node_modules/core-js/internals/shared.js"
            ), l = a(
              /*! ../internals/uid */
              "./node_modules/core-js/internals/uid.js"
            ), s = a(
              /*! ../internals/native-symbol */
              "./node_modules/core-js/internals/native-symbol.js"
            ), c = i.Symbol, u = o("wks");
            n.exports = function(f) {
              return u[f] || (u[f] = s && c[f] || (s ? c : l)("Symbol." + f));
            };
          }
        ),
        /***/
        "./node_modules/core-js/modules/es.array.from.js": (
          /*!*******************************************************!*\
            !*** ./node_modules/core-js/modules/es.array.from.js ***!
            \*******************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/export */
              "./node_modules/core-js/internals/export.js"
            ), o = a(
              /*! ../internals/array-from */
              "./node_modules/core-js/internals/array-from.js"
            ), l = a(
              /*! ../internals/check-correctness-of-iteration */
              "./node_modules/core-js/internals/check-correctness-of-iteration.js"
            ), s = !l(function(c) {
              Array.from(c);
            });
            i({ target: "Array", stat: !0, forced: s }, {
              from: o
            });
          }
        ),
        /***/
        "./node_modules/core-js/modules/es.string.iterator.js": (
          /*!************************************************************!*\
            !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
            \************************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ../internals/string-at */
              "./node_modules/core-js/internals/string-at.js"
            ), o = a(
              /*! ../internals/internal-state */
              "./node_modules/core-js/internals/internal-state.js"
            ), l = a(
              /*! ../internals/define-iterator */
              "./node_modules/core-js/internals/define-iterator.js"
            ), s = "String Iterator", c = o.set, u = o.getterFor(s);
            l(String, "String", function(f) {
              c(this, {
                type: s,
                string: String(f),
                index: 0
              });
            }, function() {
              var h = u(this), v = h.string, y = h.index, p;
              return y >= v.length ? { value: void 0, done: !0 } : (p = i(v, y, !0), h.index += p.length, { value: p, done: !1 });
            });
          }
        ),
        /***/
        "./node_modules/webpack/buildin/global.js": (
          /*!***********************************!*\
            !*** (webpack)/buildin/global.js ***!
            \***********************************/
          /*! no static exports found */
          /***/
          function(n, r) {
            var a;
            a = function() {
              return this;
            }();
            try {
              a = a || Function("return this")() || (0, eval)("this");
            } catch {
              typeof window == "object" && (a = window);
            }
            n.exports = a;
          }
        ),
        /***/
        "./src/default-attrs.json": (
          /*!********************************!*\
            !*** ./src/default-attrs.json ***!
            \********************************/
          /*! exports provided: xmlns, width, height, viewBox, fill, stroke, stroke-width, stroke-linecap, stroke-linejoin, default */
          /***/
          function(n) {
            n.exports = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
          }
        ),
        /***/
        "./src/icon.js": (
          /*!*********************!*\
            !*** ./src/icon.js ***!
            \*********************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var i = Object.assign || function(p) {
              for (var m = 1; m < arguments.length; m++) {
                var b = arguments[m];
                for (var x in b)
                  Object.prototype.hasOwnProperty.call(b, x) && (p[x] = b[x]);
              }
              return p;
            }, o = function() {
              function p(m, b) {
                for (var x = 0; x < b.length; x++) {
                  var j = b[x];
                  j.enumerable = j.enumerable || !1, j.configurable = !0, "value" in j && (j.writable = !0), Object.defineProperty(m, j.key, j);
                }
              }
              return function(m, b, x) {
                return b && p(m.prototype, b), x && p(m, x), m;
              };
            }(), l = a(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), s = f(l), c = a(
              /*! ./default-attrs.json */
              "./src/default-attrs.json"
            ), u = f(c);
            function f(p) {
              return p && p.__esModule ? p : { default: p };
            }
            function h(p, m) {
              if (!(p instanceof m))
                throw new TypeError("Cannot call a class as a function");
            }
            var v = function() {
              function p(m, b) {
                var x = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
                h(this, p), this.name = m, this.contents = b, this.tags = x, this.attrs = i({}, u.default, { class: "feather feather-" + m });
              }
              return o(p, [{
                key: "toSvg",
                value: function() {
                  var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, x = i({}, this.attrs, b, { class: (0, s.default)(this.attrs.class, b.class) });
                  return "<svg " + y(x) + ">" + this.contents + "</svg>";
                }
                /**
                 * Return string representation of an `Icon`.
                 *
                 * Added for backward compatibility. If old code expects `feather.icons.<name>`
                 * to be a string, `toString()` will get implicitly called.
                 *
                 * @returns {string}
                 */
              }, {
                key: "toString",
                value: function() {
                  return this.contents;
                }
              }]), p;
            }();
            function y(p) {
              return Object.keys(p).map(function(m) {
                return m + '="' + p[m] + '"';
              }).join(" ");
            }
            r.default = v;
          }
        ),
        /***/
        "./src/icons.js": (
          /*!**********************!*\
            !*** ./src/icons.js ***!
            \**********************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var i = a(
              /*! ./icon */
              "./src/icon.js"
            ), o = f(i), l = a(
              /*! ../dist/icons.json */
              "./dist/icons.json"
            ), s = f(l), c = a(
              /*! ./tags.json */
              "./src/tags.json"
            ), u = f(c);
            function f(h) {
              return h && h.__esModule ? h : { default: h };
            }
            r.default = Object.keys(s.default).map(function(h) {
              return new o.default(h, s.default[h], u.default[h]);
            }).reduce(function(h, v) {
              return h[v.name] = v, h;
            }, {});
          }
        ),
        /***/
        "./src/index.js": (
          /*!**********************!*\
            !*** ./src/index.js ***!
            \**********************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            var i = a(
              /*! ./icons */
              "./src/icons.js"
            ), o = f(i), l = a(
              /*! ./to-svg */
              "./src/to-svg.js"
            ), s = f(l), c = a(
              /*! ./replace */
              "./src/replace.js"
            ), u = f(c);
            function f(h) {
              return h && h.__esModule ? h : { default: h };
            }
            n.exports = { icons: o.default, toSvg: s.default, replace: u.default };
          }
        ),
        /***/
        "./src/replace.js": (
          /*!************************!*\
            !*** ./src/replace.js ***!
            \************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var i = Object.assign || function(y) {
              for (var p = 1; p < arguments.length; p++) {
                var m = arguments[p];
                for (var b in m)
                  Object.prototype.hasOwnProperty.call(m, b) && (y[b] = m[b]);
              }
              return y;
            }, o = a(
              /*! classnames/dedupe */
              "./node_modules/classnames/dedupe.js"
            ), l = u(o), s = a(
              /*! ./icons */
              "./src/icons.js"
            ), c = u(s);
            function u(y) {
              return y && y.__esModule ? y : { default: y };
            }
            function f() {
              var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              if (typeof document > "u")
                throw new Error("`feather.replace()` only works in a browser environment.");
              var p = document.querySelectorAll("[data-feather]");
              Array.from(p).forEach(function(m) {
                return h(m, y);
              });
            }
            function h(y) {
              var p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, m = v(y), b = m["data-feather"];
              delete m["data-feather"];
              var x = c.default[b].toSvg(i({}, p, m, { class: (0, l.default)(p.class, m.class) })), j = new DOMParser().parseFromString(x, "image/svg+xml"), w = j.querySelector("svg");
              y.parentNode.replaceChild(w, y);
            }
            function v(y) {
              return Array.from(y.attributes).reduce(function(p, m) {
                return p[m.name] = m.value, p;
              }, {});
            }
            r.default = f;
          }
        ),
        /***/
        "./src/tags.json": (
          /*!***********************!*\
            !*** ./src/tags.json ***!
            \***********************/
          /*! exports provided: activity, airplay, alert-circle, alert-octagon, alert-triangle, align-center, align-justify, align-left, align-right, anchor, archive, at-sign, award, aperture, bar-chart, bar-chart-2, battery, battery-charging, bell, bell-off, bluetooth, book-open, book, bookmark, box, briefcase, calendar, camera, cast, chevron-down, chevron-up, circle, clipboard, clock, cloud-drizzle, cloud-lightning, cloud-rain, cloud-snow, cloud, codepen, codesandbox, code, coffee, columns, command, compass, copy, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, cpu, credit-card, crop, crosshair, database, delete, disc, dollar-sign, droplet, edit, edit-2, edit-3, eye, eye-off, external-link, facebook, fast-forward, figma, file-minus, file-plus, file-text, film, filter, flag, folder-minus, folder-plus, folder, framer, frown, gift, git-branch, git-commit, git-merge, git-pull-request, github, gitlab, globe, hard-drive, hash, headphones, heart, help-circle, hexagon, home, image, inbox, instagram, key, layers, layout, life-buoy, link, link-2, linkedin, list, lock, log-in, log-out, mail, map-pin, map, maximize, maximize-2, meh, menu, message-circle, message-square, mic-off, mic, minimize, minimize-2, minus, monitor, moon, more-horizontal, more-vertical, mouse-pointer, move, music, navigation, navigation-2, octagon, package, paperclip, pause, pause-circle, pen-tool, percent, phone-call, phone-forwarded, phone-incoming, phone-missed, phone-off, phone-outgoing, phone, play, pie-chart, play-circle, plus, plus-circle, plus-square, pocket, power, printer, radio, refresh-cw, refresh-ccw, repeat, rewind, rotate-ccw, rotate-cw, rss, save, scissors, search, send, settings, share-2, shield, shield-off, shopping-bag, shopping-cart, shuffle, skip-back, skip-forward, slack, slash, sliders, smartphone, smile, speaker, star, stop-circle, sun, sunrise, sunset, tablet, tag, target, terminal, thermometer, thumbs-down, thumbs-up, toggle-left, toggle-right, tool, trash, trash-2, triangle, truck, tv, twitch, twitter, type, umbrella, unlock, user-check, user-minus, user-plus, user-x, user, users, video-off, video, voicemail, volume, volume-1, volume-2, volume-x, watch, wifi-off, wifi, wind, x-circle, x-octagon, x-square, x, youtube, zap-off, zap, zoom-in, zoom-out, default */
          /***/
          function(n) {
            n.exports = { activity: ["pulse", "health", "action", "motion"], airplay: ["stream", "cast", "mirroring"], "alert-circle": ["warning", "alert", "danger"], "alert-octagon": ["warning", "alert", "danger"], "alert-triangle": ["warning", "alert", "danger"], "align-center": ["text alignment", "center"], "align-justify": ["text alignment", "justified"], "align-left": ["text alignment", "left"], "align-right": ["text alignment", "right"], anchor: [], archive: ["index", "box"], "at-sign": ["mention", "at", "email", "message"], award: ["achievement", "badge"], aperture: ["camera", "photo"], "bar-chart": ["statistics", "diagram", "graph"], "bar-chart-2": ["statistics", "diagram", "graph"], battery: ["power", "electricity"], "battery-charging": ["power", "electricity"], bell: ["alarm", "notification", "sound"], "bell-off": ["alarm", "notification", "silent"], bluetooth: ["wireless"], "book-open": ["read", "library"], book: ["read", "dictionary", "booklet", "magazine", "library"], bookmark: ["read", "clip", "marker", "tag"], box: ["cube"], briefcase: ["work", "bag", "baggage", "folder"], calendar: ["date"], camera: ["photo"], cast: ["chromecast", "airplay"], "chevron-down": ["expand"], "chevron-up": ["collapse"], circle: ["off", "zero", "record"], clipboard: ["copy"], clock: ["time", "watch", "alarm"], "cloud-drizzle": ["weather", "shower"], "cloud-lightning": ["weather", "bolt"], "cloud-rain": ["weather"], "cloud-snow": ["weather", "blizzard"], cloud: ["weather"], codepen: ["logo"], codesandbox: ["logo"], code: ["source", "programming"], coffee: ["drink", "cup", "mug", "tea", "cafe", "hot", "beverage"], columns: ["layout"], command: ["keyboard", "cmd", "terminal", "prompt"], compass: ["navigation", "safari", "travel", "direction"], copy: ["clone", "duplicate"], "corner-down-left": ["arrow", "return"], "corner-down-right": ["arrow"], "corner-left-down": ["arrow"], "corner-left-up": ["arrow"], "corner-right-down": ["arrow"], "corner-right-up": ["arrow"], "corner-up-left": ["arrow"], "corner-up-right": ["arrow"], cpu: ["processor", "technology"], "credit-card": ["purchase", "payment", "cc"], crop: ["photo", "image"], crosshair: ["aim", "target"], database: ["storage", "memory"], delete: ["remove"], disc: ["album", "cd", "dvd", "music"], "dollar-sign": ["currency", "money", "payment"], droplet: ["water"], edit: ["pencil", "change"], "edit-2": ["pencil", "change"], "edit-3": ["pencil", "change"], eye: ["view", "watch"], "eye-off": ["view", "watch", "hide", "hidden"], "external-link": ["outbound"], facebook: ["logo", "social"], "fast-forward": ["music"], figma: ["logo", "design", "tool"], "file-minus": ["delete", "remove", "erase"], "file-plus": ["add", "create", "new"], "file-text": ["data", "txt", "pdf"], film: ["movie", "video"], filter: ["funnel", "hopper"], flag: ["report"], "folder-minus": ["directory"], "folder-plus": ["directory"], folder: ["directory"], framer: ["logo", "design", "tool"], frown: ["emoji", "face", "bad", "sad", "emotion"], gift: ["present", "box", "birthday", "party"], "git-branch": ["code", "version control"], "git-commit": ["code", "version control"], "git-merge": ["code", "version control"], "git-pull-request": ["code", "version control"], github: ["logo", "version control"], gitlab: ["logo", "version control"], globe: ["world", "browser", "language", "translate"], "hard-drive": ["computer", "server", "memory", "data"], hash: ["hashtag", "number", "pound"], headphones: ["music", "audio", "sound"], heart: ["like", "love", "emotion"], "help-circle": ["question mark"], hexagon: ["shape", "node.js", "logo"], home: ["house", "living"], image: ["picture"], inbox: ["email"], instagram: ["logo", "camera"], key: ["password", "login", "authentication", "secure"], layers: ["stack"], layout: ["window", "webpage"], "life-buoy": ["help", "life ring", "support"], link: ["chain", "url"], "link-2": ["chain", "url"], linkedin: ["logo", "social media"], list: ["options"], lock: ["security", "password", "secure"], "log-in": ["sign in", "arrow", "enter"], "log-out": ["sign out", "arrow", "exit"], mail: ["email", "message"], "map-pin": ["location", "navigation", "travel", "marker"], map: ["location", "navigation", "travel"], maximize: ["fullscreen"], "maximize-2": ["fullscreen", "arrows", "expand"], meh: ["emoji", "face", "neutral", "emotion"], menu: ["bars", "navigation", "hamburger"], "message-circle": ["comment", "chat"], "message-square": ["comment", "chat"], "mic-off": ["record", "sound", "mute"], mic: ["record", "sound", "listen"], minimize: ["exit fullscreen", "close"], "minimize-2": ["exit fullscreen", "arrows", "close"], minus: ["subtract"], monitor: ["tv", "screen", "display"], moon: ["dark", "night"], "more-horizontal": ["ellipsis"], "more-vertical": ["ellipsis"], "mouse-pointer": ["arrow", "cursor"], move: ["arrows"], music: ["note"], navigation: ["location", "travel"], "navigation-2": ["location", "travel"], octagon: ["stop"], package: ["box", "container"], paperclip: ["attachment"], pause: ["music", "stop"], "pause-circle": ["music", "audio", "stop"], "pen-tool": ["vector", "drawing"], percent: ["discount"], "phone-call": ["ring"], "phone-forwarded": ["call"], "phone-incoming": ["call"], "phone-missed": ["call"], "phone-off": ["call", "mute"], "phone-outgoing": ["call"], phone: ["call"], play: ["music", "start"], "pie-chart": ["statistics", "diagram"], "play-circle": ["music", "start"], plus: ["add", "new"], "plus-circle": ["add", "new"], "plus-square": ["add", "new"], pocket: ["logo", "save"], power: ["on", "off"], printer: ["fax", "office", "device"], radio: ["signal"], "refresh-cw": ["synchronise", "arrows"], "refresh-ccw": ["arrows"], repeat: ["loop", "arrows"], rewind: ["music"], "rotate-ccw": ["arrow"], "rotate-cw": ["arrow"], rss: ["feed", "subscribe"], save: ["floppy disk"], scissors: ["cut"], search: ["find", "magnifier", "magnifying glass"], send: ["message", "mail", "email", "paper airplane", "paper aeroplane"], settings: ["cog", "edit", "gear", "preferences"], "share-2": ["network", "connections"], shield: ["security", "secure"], "shield-off": ["security", "insecure"], "shopping-bag": ["ecommerce", "cart", "purchase", "store"], "shopping-cart": ["ecommerce", "cart", "purchase", "store"], shuffle: ["music"], "skip-back": ["music"], "skip-forward": ["music"], slack: ["logo"], slash: ["ban", "no"], sliders: ["settings", "controls"], smartphone: ["cellphone", "device"], smile: ["emoji", "face", "happy", "good", "emotion"], speaker: ["audio", "music"], star: ["bookmark", "favorite", "like"], "stop-circle": ["media", "music"], sun: ["brightness", "weather", "light"], sunrise: ["weather", "time", "morning", "day"], sunset: ["weather", "time", "evening", "night"], tablet: ["device"], tag: ["label"], target: ["logo", "bullseye"], terminal: ["code", "command line", "prompt"], thermometer: ["temperature", "celsius", "fahrenheit", "weather"], "thumbs-down": ["dislike", "bad", "emotion"], "thumbs-up": ["like", "good", "emotion"], "toggle-left": ["on", "off", "switch"], "toggle-right": ["on", "off", "switch"], tool: ["settings", "spanner"], trash: ["garbage", "delete", "remove", "bin"], "trash-2": ["garbage", "delete", "remove", "bin"], triangle: ["delta"], truck: ["delivery", "van", "shipping", "transport", "lorry"], tv: ["television", "stream"], twitch: ["logo"], twitter: ["logo", "social"], type: ["text"], umbrella: ["rain", "weather"], unlock: ["security"], "user-check": ["followed", "subscribed"], "user-minus": ["delete", "remove", "unfollow", "unsubscribe"], "user-plus": ["new", "add", "create", "follow", "subscribe"], "user-x": ["delete", "remove", "unfollow", "unsubscribe", "unavailable"], user: ["person", "account"], users: ["group"], "video-off": ["camera", "movie", "film"], video: ["camera", "movie", "film"], voicemail: ["phone"], volume: ["music", "sound", "mute"], "volume-1": ["music", "sound"], "volume-2": ["music", "sound"], "volume-x": ["music", "sound", "mute"], watch: ["clock", "time"], "wifi-off": ["disabled"], wifi: ["connection", "signal", "wireless"], wind: ["weather", "air"], "x-circle": ["cancel", "close", "delete", "remove", "times", "clear"], "x-octagon": ["delete", "stop", "alert", "warning", "times", "clear"], "x-square": ["cancel", "close", "delete", "remove", "times", "clear"], x: ["cancel", "close", "delete", "remove", "times", "clear"], youtube: ["logo", "video", "play"], "zap-off": ["flash", "camera", "lightning"], zap: ["flash", "camera", "lightning"], "zoom-in": ["magnifying glass"], "zoom-out": ["magnifying glass"] };
          }
        ),
        /***/
        "./src/to-svg.js": (
          /*!***********************!*\
            !*** ./src/to-svg.js ***!
            \***********************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            Object.defineProperty(r, "__esModule", {
              value: !0
            });
            var i = a(
              /*! ./icons */
              "./src/icons.js"
            ), o = l(i);
            function l(c) {
              return c && c.__esModule ? c : { default: c };
            }
            function s(c) {
              var u = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (console.warn("feather.toSvg() is deprecated. Please use feather.icons[name].toSvg() instead."), !c)
                throw new Error("The required `key` (icon name) parameter is missing.");
              if (!o.default[c])
                throw new Error("No icon matching '" + c + "'. See the complete list of icons at https://feathericons.com");
              return o.default[c].toSvg(u);
            }
            r.default = s;
          }
        ),
        /***/
        0: (
          /*!**************************************************!*\
            !*** multi core-js/es/array/from ./src/index.js ***!
            \**************************************************/
          /*! no static exports found */
          /***/
          function(n, r, a) {
            a(
              /*! core-js/es/array/from */
              "./node_modules/core-js/es/array/from.js"
            ), n.exports = a(
              /*! /home/runner/work/feather/feather/src/index.js */
              "./src/index.js"
            );
          }
        )
        /******/
      })
    );
  });
})(Hn);
var rt = Hn.exports;
const ai = /* @__PURE__ */ ni(rt), ri = /* @__PURE__ */ ra({
  __proto__: null,
  default: ai
}, [rt]);
/*! vue-feather v2.0.0 | (c) 2018-present Chen Fengyuan | MIT */
var Rn = g({
  name: "VueFeather",
  props: {
    animation: {
      type: String,
      default: void 0
    },
    animationSpeed: {
      type: String,
      default: void 0
    },
    fill: {
      type: String,
      default: "none"
    },
    size: {
      type: [Number, String],
      default: 24
    },
    stroke: {
      type: String,
      default: "currentColor"
    },
    strokeLinecap: {
      type: String,
      default: "round"
    },
    strokeLinejoin: {
      type: String,
      default: "round"
    },
    strokeWidth: {
      type: [Number, String],
      default: 2
    },
    tag: {
      type: String,
      default: "i"
    },
    type: {
      type: String,
      default: "feather",
      validator(e) {
        if (!ri)
          throw new Error("The Feather icons is required.");
        if (!rt.icons[e])
          throw new Error(`"${e}" is not an available icon type.`);
        return !0;
      }
    }
  },
  computed: {
    isRemSize() {
      return typeof this.size == "string" && this.size.endsWith("rem");
    }
  },
  render() {
    const { animation: e, animationSpeed: t, isRemSize: n, size: r, type: a } = this, i = rt.icons[a];
    return d(this.tag, {
      ...this.$attrs,
      "data-name": a,
      "data-tags": i.tags,
      "data-type": a,
      class: {
        "vue-feather": !0,
        [`vue-feather--${a}`]: a,
        [`vue-feather--${e}`]: e,
        [`vue-feather--${t}`]: t
      },
      style: n ? {
        height: r,
        width: r
      } : void 0
    }, [
      d(
        "svg",
        // XXX: The `width` and `height` attributes do not support the `rem` unit in Safari (#13).
        {
          ...i.attrs,
          fill: this.fill,
          height: n ? void 0 : r,
          stroke: this.stroke,
          "stroke-linecap": this.strokeLinecap,
          "stroke-linejoin": this.strokeLinejoin,
          "stroke-width": this.strokeWidth,
          width: n ? void 0 : r,
          class: [i.attrs.class, "vue-feather__content"],
          innerHTML: i.contents
        }
      )
    ]);
  }
});
function ii(e, t) {
  t === void 0 && (t = {});
  var n = t.insertAt;
  if (!(!e || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0], a = document.createElement("style");
    a.type = "text/css", n === "top" && r.firstChild ? r.insertBefore(a, r.firstChild) : r.appendChild(a), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(document.createTextNode(e));
  }
}
var oi = "@keyframes vue-feather--spin{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.vue-feather{display:inline-block;overflow:hidden}.vue-feather--spin{animation:vue-feather--spin 2s linear infinite}.vue-feather--pulse{animation:vue-feather--spin 2s steps(8) infinite}.vue-feather--slow{animation-duration:3s}.vue-feather--fast{animation-duration:1s}.vue-feather__content{display:block;height:inherit;width:inherit}";
ii(oi);
var D = /* @__PURE__ */ ((e) => (e[e.CHECKED = 0] = "CHECKED", e[e.UNCHECKED = 1] = "UNCHECKED", e[e.PARTIAL = 2] = "PARTIAL", e))(D || {});
const li = g({
  props: {
    checked: {
      type: Number
    }
  },
  components: {
    VueFeather: Rn,
    CButton: st
  },
  setup() {
    return {
      CheckStatus: D
    };
  }
});
const _e = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, a] of t)
    n[r] = a;
  return n;
}, si = { class: "checked-div" }, ci = { class: "checked-div" }, di = { class: "unchecked-div" };
function ui(e, t, n, r, a, i) {
  const o = z("vue-feather"), l = z("c-button");
  return F(), ye(it, null, [
    oe(ke("div", si, [
      W(l, {
        class: "check-button",
        disabled: ""
      }, {
        default: ie(() => [
          W(o, {
            type: "check",
            class: "checked-icon",
            "stroke-width": "3"
          })
        ]),
        _: 1
      })
    ], 512), [
      [pe, e.checked === e.CheckStatus.CHECKED]
    ]),
    oe(ke("div", ci, [
      W(l, {
        class: "check-button",
        disabled: ""
      }, {
        default: ie(() => [
          W(o, {
            type: "minus",
            class: "checked-icon",
            "stroke-width": "3"
          })
        ]),
        _: 1
      })
    ], 512), [
      [pe, e.checked === e.CheckStatus.PARTIAL]
    ]),
    oe(ke("div", di, [
      W(l, {
        class: "check-button",
        disabled: ""
      })
    ], 512), [
      [pe, e.checked === e.CheckStatus.UNCHECKED]
    ])
  ], 64);
}
const fi = /* @__PURE__ */ _e(li, [["render", ui], ["__scopeId", "data-v-1fbc8580"]]), pi = g({
  emits: ["select-item", "expand", "collapse"],
  props: {
    option: {
      type: Object,
      required: !0
    },
    checked: {
      type: Number
    }
  },
  components: {
    VueFeather: Rn,
    CheckBox: fi
  },
  setup(e, { emit: t }) {
    const n = () => {
      t("select-item", e.option.id);
    }, r = () => {
      e.option.hasChildren && e.option.open ? t("collapse", e.option.path) : t("expand", e.option.path);
    }, a = Me(() => e.option.path.length - 1);
    return {
      handleClick: n,
      handleIconClick: r,
      indentation: a
    };
  }
});
const yi = {
  key: 1,
  class: "check-div"
}, vi = { class: "text-div" };
function hi(e, t, n, r, a, i) {
  const o = z("vue-feather"), l = z("check-box");
  return F(), ye("div", {
    style: na({ paddingLeft: `${e.indentation * 1.6 + 0.5}rem` }),
    onClick: t[1] || (t[1] = (...s) => e.handleClick && e.handleClick(...s)),
    class: "dropdown-item-div"
  }, [
    e.option.hasChildren ? (F(), ye("div", {
      key: 0,
      class: "icon-div",
      onClick: t[0] || (t[0] = Ae((...s) => e.handleIconClick && e.handleIconClick(...s), ["prevent", "stop"]))
    }, [
      oe(W(o, {
        type: "chevron-right",
        class: "icon"
      }, null, 512), [
        [pe, !e.option.open]
      ]),
      oe(W(o, {
        type: "chevron-down",
        class: "icon"
      }, null, 512), [
        [pe, e.option.open]
      ])
    ])) : et("", !0),
    e.checked !== void 0 ? (F(), ye("div", yi, [
      W(l, { checked: e.checked }, null, 8, ["checked"])
    ])) : et("", !0),
    ke("div", vi, [
      ke("span", null, ot(e.option.label), 1)
    ])
  ], 4);
}
const Nn = /* @__PURE__ */ _e(pi, [["render", hi], ["__scopeId", "data-v-f6d30688"]]), Dn = (e) => {
  const t = [];
  return Fn(t, e), t;
}, Fn = (e, t, n = [], r = !0) => {
  t.forEach((a) => {
    const i = a.hasOwnProperty("children"), o = [...n, a.id], l = {
      id: a.id,
      label: a.label,
      path: o,
      show: r
    };
    i ? (e.push({ ...l, hasChildren: i, open: !1 }), Fn(e, a.children, o, !1)) : e.push({ ...l, hasChildren: i });
  });
}, Ct = (e, t) => JSON.stringify(e) === JSON.stringify(t), Kn = (e, t) => {
  const n = [t];
  let r = e.findIndex((i) => Ct(i.path, t));
  const a = e[r];
  for (a.hasChildren && (a.open = !0), r++; r < e.length && e[r].path.length > t.length; ) {
    const i = e[r], o = n.some((l) => l.length === e[r].path.length - 1 && Ct(l, e[r].path.slice(0, -1)));
    i.show = o, i.hasChildren && i.open && n.push(i.path), r++;
  }
}, Wn = (e, t) => {
  let n = e.findIndex((a) => Ct(a.path, t));
  const r = e[n];
  for (r.hasChildren && (r.open = !1), n++; n < e.length && e[n].path.length > t.length; )
    e[n].show = !1, n++;
}, yn = (e, t) => {
  const n = [...t];
  return t.map((a) => {
    const i = e.findIndex((o) => o.id === a);
    return [e[i], i + 1];
  }).forEach(([a, i]) => {
    let o = i;
    for (; o < e.length && e[o].path.length > a.path.length; ) {
      const l = e[o].id;
      n.includes(l) || n.push(l), o++;
    }
  }), n;
}, mi = (e, t, n) => {
  e && (n === D.CHECKED ? t[e].checked++ : n === D.UNCHECKED ? t[e].unchecked++ : n === D.PARTIAL && t[e].partial++);
}, gi = (e, t) => {
  const n = {};
  e.forEach((i) => {
    n[i.path.join("/")] = D.UNCHECKED;
  });
  const r = e.slice();
  r.sort((i, o) => i.path.length > o.path.length ? -1 : 1);
  const a = {};
  return r.forEach((i) => {
    i.hasChildren && (a[i.id] = {
      checked: 0,
      unchecked: 0,
      partial: 0
    });
  }), r.forEach((i) => {
    let o;
    const l = i.path.at(-2);
    if (!i.hasChildren)
      t.includes(i.id) ? o = D.CHECKED : o = D.UNCHECKED;
    else {
      const s = a[i.id];
      s.checked === 0 && s.partial === 0 ? o = D.UNCHECKED : s.unchecked === 0 && s.partial === 0 ? o = D.CHECKED : o = D.PARTIAL;
    }
    mi(l, a, o), n[i.path.join("/")] = o;
  }), n;
}, xi = (e, t, n) => {
  const r = [], a = [];
  return e.forEach((i) => {
    if (a.includes(i.id))
      return;
    const o = i.path;
    for (let l = 0; l < o.length; l++) {
      const s = t.find((c) => c.id === o[l]);
      if (n[s.path.join("/")] === D.CHECKED) {
        r.map((c) => c.id).includes(s.id) || r.push({
          id: s.id,
          label: s.label
        }), a.push(...o.slice(l + 1));
        break;
      }
    }
  }), r;
}, bi = g({
  emits: ["update:modelValue"],
  components: {
    CDropdown: Mn,
    CDropdownToggle: Bn,
    CDropdownItem: An,
    CDropdownMenu: En,
    DropdownItem: Nn
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "Select..."
    },
    modelValue: {
      type: String
    }
  },
  setup(e, { emit: t }) {
    const n = k(Dn(e.options)), r = k(!1), a = Me(() => {
      var c;
      return (c = n.value.find((u) => u.id === e.modelValue)) == null ? void 0 : c.label;
    });
    return {
      showDropdownMenu: r,
      label: a,
      flatOptions: n,
      expand: (c) => {
        Kn(n.value, c);
      },
      collapse: (c) => {
        Wn(n.value, c);
      },
      handleSelectItem: (c) => {
        t("update:modelValue", c), r.value = !1;
      },
      toggleDropdownMenu: () => {
        r.value = !r.value;
      }
    };
  }
});
const ji = { class: "label" };
function wi(e, t, n, r, a, i) {
  const o = z("c-dropdown-toggle"), l = z("dropdown-item"), s = z("c-dropdown-item"), c = z("c-dropdown-menu"), u = z("c-dropdown");
  return F(), Oe(u, {
    "auto-close": "outside",
    class: "dropdown",
    popper: !1,
    visible: e.showDropdownMenu
  }, {
    default: ie(() => [
      W(o, { onClick: e.toggleDropdownMenu }, {
        default: ie(() => [
          ke("span", ji, ot(e.label || e.placeholder), 1)
        ]),
        _: 1
      }, 8, ["onClick"]),
      W(c, {
        class: "menu",
        onClick: t[0] || (t[0] = Ae(() => {
        }, ["prevent"])),
        onMousedown: t[1] || (t[1] = Ae(() => {
        }, ["prevent"]))
      }, {
        default: ie(() => [
          (F(!0), ye(it, null, St(e.flatOptions, (f) => oe((F(), Oe(s, { class: "item" }, {
            default: ie(() => [
              W(l, {
                option: f,
                onExpand: e.expand,
                onCollapse: e.collapse,
                onSelectItem: e.handleSelectItem
              }, null, 8, ["option", "onExpand", "onCollapse", "onSelectItem"])
            ]),
            _: 2
          }, 1536)), [
            [pe, f.show]
          ])), 256))
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["visible"]);
}
const $i = /* @__PURE__ */ _e(bi, [["render", wi], ["__scopeId", "data-v-510fdb16"]]), Ci = g({
  emits: ["select-tag"],
  props: {
    tags: {
      type: Array,
      required: !0
    }
  },
  components: {
    CButton: st
  },
  setup(e, { emit: t }) {
    return {
      handleTagClick: (r) => {
        t("select-tag", r);
      }
    };
  }
});
const Si = { class: "tag-div" };
function ki(e, t, n, r, a, i) {
  const o = z("c-button");
  return F(), ye("span", Si, [
    (F(!0), ye(it, null, St(e.tags, (l) => (F(), Oe(o, {
      onClick: Ae(() => e.handleTagClick(l.id), ["prevent", "stop"]),
      class: "tag"
    }, {
      default: ie(() => [
        aa(ot(l.label), 1)
      ]),
      _: 2
    }, 1032, ["onClick"]))), 256))
  ]);
}
const Oi = /* @__PURE__ */ _e(Ci, [["render", ki], ["__scopeId", "data-v-7b7d1666"]]), Mi = g({
  emits: ["update:modelValue"],
  components: {
    CDropdown: Mn,
    CDropdownToggle: Bn,
    CDropdownItem: An,
    CDropdownMenu: En,
    DropdownItem: Nn,
    Tags: Oi
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: "Select..."
    },
    modelValue: {
      type: Array
    }
  },
  setup(e, { emit: t }) {
    const n = k(Dn(e.options)), r = Me(() => {
      var c;
      const s = ((c = e.modelValue) == null ? void 0 : c.map((u) => n.value.find((f) => f.id === u))) || [];
      return xi(s, n.value, a.value);
    }), a = Me(() => {
      const s = yn(n.value, e.modelValue || []);
      return gi(n.value, s);
    });
    return {
      tagsArray: r,
      flatOptions: n,
      expand: (s) => {
        Kn(n.value, s);
      },
      collapse: (s) => {
        Wn(n.value, s);
      },
      handleSelectItem: (s) => {
        var f, h;
        const c = n.value.find((v) => v.id === s), u = a.value[c.path.join("/")];
        if (c.hasChildren) {
          const v = yn(n.value, [s]);
          if (u === D.CHECKED || u === D.PARTIAL) {
            const y = c.path, p = [...v, ...y];
            t("update:modelValue", [...((f = e.modelValue) == null ? void 0 : f.filter((m) => !p.includes(m))) || []]);
          } else
            t("update:modelValue", [...e.modelValue || [], ...v]);
        } else if (u === D.CHECKED) {
          const v = c.path;
          t("update:modelValue", [...((h = e.modelValue) == null ? void 0 : h.filter((y) => !v.includes(y))) || []]);
        } else
          t("update:modelValue", [...e.modelValue || [], s]);
      },
      checkedObject: a
    };
  }
});
const Ai = {
  key: 1,
  class: "placeholder-span"
};
function Ei(e, t, n, r, a, i) {
  const o = z("tags"), l = z("c-dropdown-toggle"), s = z("dropdown-item"), c = z("c-dropdown-item"), u = z("c-dropdown-menu"), f = z("c-dropdown");
  return F(), Oe(f, {
    "auto-close": "outside",
    popper: !1,
    class: "dropdown"
  }, {
    default: ie(() => [
      W(l, null, {
        default: ie(() => [
          e.tagsArray.length > 0 ? (F(), Oe(o, {
            key: 0,
            tags: e.tagsArray,
            onSelectTag: e.handleSelectItem
          }, null, 8, ["tags", "onSelectTag"])) : et("", !0),
          e.tagsArray.length === 0 ? (F(), ye("span", Ai, ot(e.placeholder), 1)) : et("", !0)
        ]),
        _: 1
      }),
      W(u, {
        class: "menu",
        onClick: t[0] || (t[0] = Ae(() => {
        }, ["prevent"])),
        onMousedown: t[1] || (t[1] = Ae(() => {
        }, ["prevent"]))
      }, {
        default: ie(() => [
          (F(!0), ye(it, null, St(e.flatOptions, (h) => oe((F(), Oe(c, { class: "item" }, {
            default: ie(() => [
              W(s, {
                option: h,
                checked: e.checkedObject[h.path.join("/")],
                onExpand: e.expand,
                onCollapse: e.collapse,
                onSelectItem: e.handleSelectItem
              }, null, 8, ["option", "checked", "onExpand", "onCollapse", "onSelectItem"])
            ]),
            _: 2
          }, 1536)), [
            [pe, h.show]
          ])), 256))
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const Ii = /* @__PURE__ */ _e(Mi, [["render", Ei], ["__scopeId", "data-v-212cbd37"]]);
export {
  Ii as MultiSelect,
  $i as SingleSelect
};
