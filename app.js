(function exposeDinnerMenuApp(root, factory) {
  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (root) {
    root.DinnerMenuApp = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : undefined, function createApi() {
  "use strict";

  const TYPE_LABELS = {
    meat: "荤",
    vegetable: "素",
    soup: "汤",
  };

  const BASE_GRAMS_PER_PERSON = 150;
  const COOKING_LOSS_MULTIPLIER = 4 / 3;
  const GRAMS_PER_PERSON = Math.round(BASE_GRAMS_PER_PERSON * COOKING_LOSS_MULTIPLIER);

  const NATURAL_QUANTITY_RULES = {
    carrot: { unitGrams: 120, unitLabel: "根胡萝卜" },
    zucchini: { unitGrams: 250, unitLabel: "个中等西葫芦" },
    bokChoy: { unitGrams: 250, unitLabel: "把小青菜" },
    eggplant: { unitGrams: 180, unitLabel: "根茄子" },
    bambooShoot: { unitGrams: 150, unitLabel: "根笋" },
    potato: { unitGrams: 150, unitLabel: "个中等土豆" },
    mushroom: { unitGrams: 250, unitLabel: "盒蘑菇" },
    cucumber: { unitGrams: 180, unitLabel: "根黄瓜", rangeWhenBetweenOneAndTwo: true },
    tomato: { unitGrams: 150, unitLabel: "个番茄" },
  };

  const DISH_OPTIONS = {
    meat: {
      beef: {
        label: "牛肉",
        methods: [
          "红烧牛肉",
          "咖喱牛肉",
          "番茄牛肉",
          "黑椒牛柳",
          "土豆炖牛肉",
          "孜然牛肉",
          "青椒牛肉",
          "水煮牛肉",
          "葱爆牛肉",
          "酱牛肉",
        ],
      },
      pork: {
        label: "猪肉",
        methods: [
          "红烧肉",
          "糖醋里脊",
          "鱼香肉丝",
          "回锅肉",
          "梅菜扣肉",
          "蒜苔炒肉",
          "小炒肉",
          "肉末茄子",
          "锅包肉",
          "香菇肉片",
        ],
      },
      chicken: {
        label: "鸡肉",
        methods: [
          "宫保鸡丁",
          "黄焖鸡",
          "辣子鸡",
          "可乐鸡翅",
          "三杯鸡",
          "土豆炖鸡",
          "香菇滑鸡",
          "咖喱鸡",
          "葱油鸡",
          "照烧鸡腿",
        ],
      },
      riverFish: {
        label: "河鱼",
        methods: [
          "红烧河鱼",
          "清蒸河鱼",
          "酸菜河鱼",
          "豆瓣河鱼",
          "葱姜河鱼",
        ],
      },
      seaFish: {
        label: "海鱼",
        methods: [
          "清蒸海鱼",
          "香煎海鱼",
          "红烧海鱼",
          "蒜香烤海鱼",
          "番茄海鱼",
        ],
      },
      shrimp: {
        label: "虾",
        methods: [
          "白灼虾",
          "蒜蓉粉丝虾",
          "油焖大虾",
          "椒盐虾",
          "番茄虾仁",
        ],
      },
      shellfish: {
        label: "贝类",
        methods: [
          "蒜蓉粉丝贝类",
          "豉汁蒸贝类",
          "辣炒贝类",
          "葱姜炒贝类",
          "清蒸贝类",
        ],
      },
      squid: {
        label: "鱿鱼",
        methods: [
          "爆炒鱿鱼",
          "酱爆鱿鱼",
          "椒盐鱿鱼",
          "青椒鱿鱼",
          "铁板鱿鱼",
        ],
      },
    },
    vegetable: {
      carrot: {
        label: "胡萝卜",
        methods: [
          "清炒胡萝卜丝",
          "胡萝卜炒蛋",
          "胡萝卜木耳小炒",
          "胡萝卜土豆丝",
          "胡萝卜玉米粒",
        ],
      },
      zucchini: {
        label: "西葫芦",
        methods: [
          "清炒西葫芦",
          "西葫芦炒蛋",
          "蒜香西葫芦",
          "番茄西葫芦",
          "西葫芦木耳",
        ],
      },
      bokChoy: {
        label: "小青菜",
        methods: [
          "清炒小青菜",
          "蒜蓉小青菜",
          "蚝油小青菜",
          "白灼小青菜",
          "上汤小青菜",
        ],
      },
      cabbage: {
        label: "大白菜",
        methods: [
          "清炒大白菜",
          "醋溜大白菜",
          "蒜蓉大白菜",
          "白菜豆腐",
          "白菜粉条",
        ],
      },
      eggplant: {
        label: "茄子",
        methods: [
          "蒜蓉茄子",
          "鱼香茄子",
          "红烧茄子",
          "茄子豆角",
          "凉拌茄子",
        ],
      },
      bambooShoot: {
        label: "笋",
        methods: [
          "清炒笋片",
          "油焖笋",
          "笋片炒蛋",
          "凉拌笋丝",
          "笋片木耳",
        ],
      },
      potato: {
        label: "土豆",
        methods: [
          "清炒土豆丝",
          "酸辣土豆丝",
          "土豆炖豆角",
          "土豆烧茄子",
          "土豆片炒蛋",
        ],
      },
      mushroom: {
        label: "蘑菇",
        methods: [
          "清炒蘑菇",
          "蘑菇炒蛋",
          "蚝油蘑菇",
          "蘑菇青菜",
          "蘑菇豆腐",
        ],
      },
      cucumber: {
        label: "黄瓜",
        methods: [
          "凉拌黄瓜",
          "黄瓜炒蛋",
          "蒜蓉黄瓜片",
          "黄瓜木耳",
          "黄瓜拌腐竹",
        ],
      },
      tomato: {
        label: "番茄",
        methods: [
          "番茄炒蛋",
          "番茄豆腐",
          "凉拌番茄",
          "番茄蘑菇",
          "番茄西葫芦",
        ],
      },
    },
  };

  const SOUP_OPTIONS = {
    seaweedEgg: {
      label: "紫菜蛋花汤",
      ingredient: "紫菜、鸡蛋",
      recipe: "水开后加入紫菜，淋入蛋液，加盐和葱花调味即可。",
    },
    tomatoEgg: {
      label: "番茄蛋汤",
      ingredient: "番茄、鸡蛋",
      recipe: "番茄炒出汁后加水煮开，淋入蛋液，加盐和葱花调味。",
    },
    winterMelonRibs: {
      label: "冬瓜排骨汤",
      ingredient: "冬瓜、排骨",
      recipe: "排骨焯水后加姜片炖煮，放入冬瓜煮软，加盐调味即可。",
    },
    cornRibs: {
      label: "玉米排骨汤",
      ingredient: "玉米、排骨",
      recipe: "排骨焯水后和玉米段一起炖煮，汤色清亮后加盐调味。",
    },
    radishBrisket: {
      label: "萝卜牛腩汤",
      ingredient: "萝卜、牛腩",
      recipe: "牛腩焯水后加姜片炖到软烂，加入萝卜煮透，加盐调味。",
    },
    vegetableSoup: {
      label: "蔬菜汤",
      ingredient: "时令蔬菜",
      recipe: "水开后加入蔬菜，煮到断生，加盐和少量香油调味即可。",
    },
  };

  const DISH_RECIPES = {
    "meat.beef.红烧牛肉": "牛肉切块焯水，和姜片、葱段、八角、冰糖、生抽一起炒香，加热水小火炖软，最后收成浓汁。",
    "meat.beef.咖喱牛肉": "牛肉切块焯水，配土豆、胡萝卜和洋葱炒香，加咖喱块和清水煮到牛肉软烂、汤汁浓稠。",
    "meat.beef.番茄牛肉": "牛肉片或牛腩先焯水，番茄炒出红汤，加入洋葱和少量番茄酱同煮，炖到牛肉入味。",
    "meat.beef.黑椒牛柳": "牛柳切条用生抽、淀粉抓匀，配洋葱和彩椒大火快炒，最后加黑椒汁裹匀出锅。",
    "meat.beef.土豆炖牛肉": "牛肉块焯水后与姜葱炒香，加入土豆块、胡萝卜和热水炖煮，土豆软糯后加盐收汁。",
    "meat.beef.孜然牛肉": "牛肉片用料酒和淀粉腌好，配洋葱丝、香菜梗大火滑炒，撒孜然粉和辣椒面炒香。",
    "meat.beef.青椒牛肉": "牛肉片腌好后先滑炒变色，加入青椒丝、蒜片和少量蚝油快炒，保持青椒脆嫩。",
    "meat.beef.水煮牛肉": "豆芽和青菜垫底，牛肉片用淀粉上浆，放入豆瓣辣汤中滑熟，撒花椒辣椒后泼热油。",
    "meat.beef.葱爆牛肉": "牛肉片腌制后大火滑散，加入大量大葱段、姜丝和少量生抽爆炒，葱香出来立刻出锅。",
    "meat.beef.酱牛肉": "酱牛肉用牛腱子焯水后放入黄豆酱、老抽、香料和姜葱卤煮，浸泡入味后切片上桌。",

    "meat.pork.红烧肉": "五花肉切块煸出油，炒糖色后加姜片、八角、生抽和热水慢炖，肉软后大火收亮汁。",
    "meat.pork.糖醋里脊": "里脊条用盐和淀粉挂糊炸脆，另炒番茄酱、白糖和醋成糖醋汁，倒入里脊快速裹匀。",
    "meat.pork.鱼香肉丝": "猪肉丝上浆滑炒，配木耳丝、胡萝卜丝和青椒丝，加入泡椒、蒜末和鱼香汁炒匀。",
    "meat.pork.回锅肉": "五花肉煮到八成熟切片，和蒜苗、青椒一起煸炒，加入郫县豆瓣和甜面酱炒出锅气。",
    "meat.pork.梅菜扣肉": "五花肉煮后上色炸皮，切片铺碗，盖上泡洗好的梅干菜和酱汁蒸到酥软，倒扣装盘。",
    "meat.pork.蒜苔炒肉": "猪肉片用生抽腌制，先炒到变色，再加入蒜苔段和小米椒快炒，蒜苔断生后调味。",
    "meat.pork.小炒肉": "五花肉薄片煸香出油，加入螺丝椒、蒜片和豆豉大火翻炒，酱香和椒香出来就出锅。",
    "meat.pork.肉末茄子": "猪肉末炒散出香味，加入蒜末、豆瓣酱和煎软的茄子条，补少量水烧到茄子入味。",
    "meat.pork.锅包肉": "锅包肉用猪里脊切片挂土豆淀粉糊炸酥，炒姜丝、胡萝卜丝和糖醋汁，回锅快速翻匀。",
    "meat.pork.香菇肉片": "猪肉片上浆滑炒，加入鲜香菇片、青椒和蒜片同炒，淋蚝油和少量水焖一下入味。",

    "meat.chicken.宫保鸡丁": "鸡腿肉切丁上浆，配花生米、干辣椒和葱段，炒香后倒入宫保汁，酸甜微辣地裹住鸡丁。",
    "meat.chicken.黄焖鸡": "鸡块煎香后加入姜片、香菇、青椒和土豆块，加酱油和热水焖煮到汤汁浓厚。",
    "meat.chicken.辣子鸡": "鸡块腌好炸到外酥，和大量干辣椒、花椒、蒜片一起翻炒，最后撒芝麻和葱段。",
    "meat.chicken.可乐鸡翅": "鸡翅两面煎黄，加入姜片、生抽和可乐小火焖煮，汤汁变亮变稠后收汁。",
    "meat.chicken.三杯鸡": "鸡块用麻油煸香姜片，加入米酒、生抽和罗勒叶焖煮，最后收成浓香酱汁。",
    "meat.chicken.土豆炖鸡": "鸡块焯水后与姜葱炒香，加入土豆块、胡萝卜和热水炖煮，鸡肉熟透后收汁。",
    "meat.chicken.香菇滑鸡": "鸡腿肉切块用淀粉腌制，和泡发香菇、姜丝一起蒸或焖，保留香菇汁的鲜味。",
    "meat.chicken.咖喱鸡": "鸡块煎香，配土豆、胡萝卜和洋葱炒软，加入咖喱块和椰浆或清水煮浓。",
    "meat.chicken.葱油鸡": "整鸡或鸡腿煮熟后浸凉，淋上用葱段、姜末和热油熬出的葱油汁，切块装盘。",
    "meat.chicken.照烧鸡腿": "鸡腿去骨煎到皮脆，加入酱油、味醂或蜂蜜调成照烧汁，小火收汁后切块。",

    "meat.riverFish.红烧河鱼": "河鱼处理干净煎到两面定型，加入姜片、蒜瓣、葱段、生抽和少量糖，加水烧到鱼肉入味。",
    "meat.riverFish.清蒸河鱼": "河鱼改刀后铺姜片和葱段，水开上锅蒸熟，倒掉蒸汁后淋蒸鱼豉油和热葱油。",
    "meat.riverFish.酸菜河鱼": "河鱼片或鱼块用盐和淀粉抓匀，酸菜、泡椒和姜蒜炒香成汤底，放鱼煮熟后撒葱花。",
    "meat.riverFish.豆瓣河鱼": "整条河鱼煎香，豆瓣酱、姜蒜和泡椒炒出红油，加水烧鱼，最后撒青蒜收汁。",
    "meat.riverFish.葱姜河鱼": "河鱼切块用盐腌一下，姜片和葱段铺底清蒸或焖烧，出锅淋热油突出葱姜香。",

    "meat.seaFish.清蒸海鱼": "海鱼洗净控干，鱼身放姜片和葱丝，水开蒸熟后淋蒸鱼豉油，再浇热油。",
    "meat.seaFish.香煎海鱼": "海鱼用盐、黑胡椒和柠檬汁腌十分钟，薄薄拍粉后煎到两面金黄，配柠檬角上桌。",
    "meat.seaFish.红烧海鱼": "海鱼煎定型，加入姜蒜、葱段、料酒、生抽和少量糖，加水中火烧到汤汁挂鱼身。",
    "meat.seaFish.蒜香烤海鱼": "海鱼抹盐和黑胡椒，铺蒜蓉、洋葱和彩椒，刷少量油后烤到鱼肉刚熟。",
    "meat.seaFish.番茄海鱼": "番茄炒软出汁，加入洋葱丁和少量番茄酱煮成汤底，放海鱼块小火煮熟。",

    "meat.shrimp.白灼虾": "鲜虾剪须去虾线，姜片、葱段和料酒煮水，水沸后下虾烫到变红，配姜醋汁。",
    "meat.shrimp.蒜蓉粉丝虾": "粉丝泡软垫盘底，开背虾铺在上面，盖蒜蓉酱上锅蒸熟，出锅淋热油和生抽。",
    "meat.shrimp.油焖大虾": "大虾开背去虾线，先煎出虾油，加入姜丝、葱段、生抽和少量糖焖到红亮收汁。",
    "meat.shrimp.椒盐虾": "虾擦干后煎炸到壳脆，另炒蒜末、青红椒碎和椒盐，倒回虾快速翻匀。",
    "meat.shrimp.番茄虾仁": "虾仁用盐和淀粉抓匀，番茄炒成浓汁，加入豌豆或玉米粒，再下虾仁滑熟。",

    "meat.shellfish.蒜蓉粉丝贝类": "粉丝泡软垫底，贝类刷洗干净铺好，浇蒜蓉酱蒸到开口，撒葱花淋热油。",
    "meat.shellfish.豉汁蒸贝类": "贝类洗净后放盘，豆豉、蒜末、姜末和生抽调成豉汁，蒸到贝肉刚熟。",
    "meat.shellfish.辣炒贝类": "贝类焯到开口沥干，姜蒜、干辣椒和豆瓣酱炒香，倒入贝类大火翻炒入味。",
    "meat.shellfish.葱姜炒贝类": "贝类焯水去沙，热锅爆香姜片和葱段，加入贝类、料酒和少量生抽快速翻炒。",
    "meat.shellfish.清蒸贝类": "贝类吐沙刷净，盘底铺姜片和葱段，水开蒸到开口，蘸蒜蓉生抽食用。",

    "meat.squid.爆炒鱿鱼": "鱿鱼改花刀焯水卷起，配青红椒、洋葱和蒜片大火爆炒，少量生抽提鲜。",
    "meat.squid.酱爆鱿鱼": "鱿鱼焯水后沥干，甜面酱或黄豆酱与姜蒜炒香，加入洋葱块和鱿鱼快速裹酱。",
    "meat.squid.椒盐鱿鱼": "鱿鱼圈擦干后裹薄粉煎炸到微脆，和蒜末、辣椒碎、椒盐一起翻匀。",
    "meat.squid.青椒鱿鱼": "鱿鱼片焯水，和青椒块、洋葱丝、姜蒜一起大火快炒，加盐和蚝油调味。",
    "meat.squid.铁板鱿鱼": "鱿鱼条先煎香，配洋葱丝、青椒和孜然辣椒粉在热锅中翻炒出焦香。",

    "vegetable.carrot.清炒胡萝卜丝": "胡萝卜切细丝，蒜末炝锅后下锅快炒，可加少量葱花，炒软后用盐调味。",
    "vegetable.carrot.胡萝卜炒蛋": "鸡蛋先炒成大块盛出，胡萝卜丝炒软后倒回鸡蛋，加葱花和盐炒匀。",
    "vegetable.carrot.胡萝卜木耳小炒": "木耳泡发撕小朵，胡萝卜片和蒜片先炒，再加入木耳、少量青椒片和盐快炒。",
    "vegetable.carrot.胡萝卜土豆丝": "土豆丝冲去淀粉，和胡萝卜丝一起大火快炒，加入蒜末、醋和盐保持爽脆。",
    "vegetable.carrot.胡萝卜玉米粒": "胡萝卜切丁焯一下，和玉米粒、豌豆粒同炒，少量黄油或食用油提香，加盐调味。",

    "vegetable.zucchini.清炒西葫芦": "西葫芦切薄片，蒜片爆香后大火翻炒，加少量盐让其出汁，断生即可。",
    "vegetable.zucchini.西葫芦炒蛋": "鸡蛋炒成嫩块盛出，西葫芦片和蒜末炒软，倒回鸡蛋一起加盐翻匀。",
    "vegetable.zucchini.蒜香西葫芦": "西葫芦切条或片，先用蒜末和小米椒炒香，再下西葫芦快炒到边缘微透明。",
    "vegetable.zucchini.番茄西葫芦": "番茄先炒出红汁，加入西葫芦片和少量蒜末一起烧软，汤汁裹住西葫芦后调盐。",
    "vegetable.zucchini.西葫芦木耳": "木耳泡发，西葫芦片和胡萝卜片先炒，再加入木耳翻炒，淋少量蚝油提鲜。",

    "vegetable.bokChoy.清炒小青菜": "小青菜洗净沥干，蒜片炝锅后先下菜梗再下菜叶，大火炒到翠绿加盐。",
    "vegetable.bokChoy.蒜蓉小青菜": "小青菜焯水或快炒至断生，蒜蓉用油炒香，淋在菜上或回锅翻匀。",
    "vegetable.bokChoy.蚝油小青菜": "小青菜焯水摆盘，蚝油、生抽、蒜末和少量水淀粉煮成芡汁后淋上。",
    "vegetable.bokChoy.白灼小青菜": "小青菜加少量油盐焯到翠绿，捞出摆盘，淋上生抽和热葱油。",
    "vegetable.bokChoy.上汤小青菜": "蒜粒煎香后加高汤或清水，放入小青菜、皮蛋丁或咸蛋碎煮到菜梗变软。",

    "vegetable.cabbage.清炒大白菜": "大白菜帮叶分开切，先炒白菜帮和蒜片，再下菜叶，大火炒软后加盐。",
    "vegetable.cabbage.醋溜大白菜": "白菜帮切片，干辣椒和蒜片爆香，加入白菜帮快炒，沿锅边烹醋并加盐糖。",
    "vegetable.cabbage.蒜蓉大白菜": "大白菜切段，蒜末炒香后下白菜帮和菜叶翻炒，出水后加盐和少量鸡精。",
    "vegetable.cabbage.白菜豆腐": "豆腐切块煎定型，大白菜和姜片炒软后加清水，放豆腐一起炖到汤甜味浓。",
    "vegetable.cabbage.白菜粉条": "粉条提前泡软，白菜炒出水后加粉条、生抽和少量清水，焖到粉条透明入味。",

    "vegetable.eggplant.蒜蓉茄子": "茄子切条蒸软或煎软，蒜蓉加生抽、少量糖和香油调汁，浇在茄子上拌匀。",
    "vegetable.eggplant.鱼香茄子": "茄子条煎软，泡椒、蒜末和姜末炒香，加入糖醋生抽调成鱼香汁烧入味。",
    "vegetable.eggplant.红烧茄子": "茄子滚刀块煎到软塌，加入青椒块、蒜末、生抽和少量糖烧到酱汁挂住茄子。",
    "vegetable.eggplant.茄子豆角": "豆角煸到起皱，茄子条煎软，加入蒜末和生抽一起回锅翻炒入味。",
    "vegetable.eggplant.凉拌茄子": "茄子蒸熟撕条，加入蒜泥、生抽、香醋、辣椒油和葱花拌匀。",

    "vegetable.bambooShoot.清炒笋片": "笋切片先焯水去涩，蒜片爆香后下笋片快炒，加盐和少量糖提鲜。",
    "vegetable.bambooShoot.油焖笋": "笋段焯水后用油煸香，加入生抽、老抽、冰糖和少量水焖到颜色红亮。",
    "vegetable.bambooShoot.笋片炒蛋": "笋片焯水，鸡蛋炒成块盛出，再炒笋片和葱花，最后倒回鸡蛋调味。",
    "vegetable.bambooShoot.凉拌笋丝": "笋丝焯熟过凉，加入蒜末、香醋、生抽、辣椒油和香菜拌匀。",
    "vegetable.bambooShoot.笋片木耳": "木耳泡发，笋片焯水后和木耳、胡萝卜片一起炒，少量蚝油提鲜。",

    "vegetable.potato.清炒土豆丝": "土豆切丝冲去淀粉，蒜末炝锅后大火快炒，加盐和少量白醋保持爽脆。",
    "vegetable.potato.酸辣土豆丝": "土豆丝冲洗沥干，干辣椒和蒜末炒香，下土豆丝快炒，沿锅边烹醋，加盐出锅。",
    "vegetable.potato.土豆炖豆角": "豆角先煸到变色，加入土豆块、蒜末、生抽和清水焖煮，土豆软后收汁。",
    "vegetable.potato.土豆烧茄子": "土豆块煎到表面金黄，茄子块煎软，加入青椒、蒜末和酱汁烧到入味。",
    "vegetable.potato.土豆片炒蛋": "土豆切薄片焯到半熟，鸡蛋先炒成块，回锅和土豆片、葱花一起炒香。",

    "vegetable.mushroom.清炒蘑菇": "蘑菇撕片或切片，蒜片爆香后下锅炒出水分，撒葱花和盐收干香味。",
    "vegetable.mushroom.蘑菇炒蛋": "蘑菇先炒到出汁收干，鸡蛋炒嫩后倒回锅中，加葱花和盐炒匀。",
    "vegetable.mushroom.蚝油蘑菇": "蘑菇焯水或煸软，加入蒜末、蚝油、生抽和少量水，烧到汤汁裹住蘑菇。",
    "vegetable.mushroom.蘑菇青菜": "蘑菇片先炒出鲜味，再加入小青菜梗和菜叶同炒，用盐和蚝油调味。",
    "vegetable.mushroom.蘑菇豆腐": "豆腐煎定型，蘑菇炒香后加清水和生抽，放豆腐小火烧入味。",

    "vegetable.cucumber.凉拌黄瓜": "黄瓜拍裂切段，加入蒜末、香醋、生抽、少量糖和香油，拌匀后静置入味。",
    "vegetable.cucumber.黄瓜炒蛋": "鸡蛋炒成嫩块，黄瓜片用大火快速翻炒，倒回鸡蛋后加盐，保持黄瓜清脆。",
    "vegetable.cucumber.蒜蓉黄瓜片": "黄瓜切厚片，蒜末爆香后快速翻炒黄瓜，少量盐和白胡椒调味，不久炒。",
    "vegetable.cucumber.黄瓜木耳": "木耳泡发焯水，黄瓜片和蒜片快炒，加入木耳、少量生抽和盐翻匀。",
    "vegetable.cucumber.黄瓜拌腐竹": "腐竹泡发焯水，黄瓜拍段，加入蒜末、香醋、生抽、辣椒油和花生米拌匀。",

    "vegetable.tomato.番茄炒蛋": "鸡蛋先炒成大块，番茄去皮切块炒出汁，倒回鸡蛋，加盐和少量糖收成浓汁。",
    "vegetable.tomato.番茄豆腐": "豆腐切块煎定型，番茄炒成汤汁，加入豆腐小火烧入味，撒葱花。",
    "vegetable.tomato.凉拌番茄": "番茄切块或切片，撒少量白糖或盐，冷藏片刻，吃前点几滴香油。",
    "vegetable.tomato.番茄蘑菇": "番茄炒出红汁，加入蘑菇片和蒜末一起煮软，少量盐和黑胡椒调味。",
    "vegetable.tomato.番茄西葫芦": "西葫芦切半月片，先把番茄块炒到起沙，再合炒西葫芦，少量糖盐调出酸甜汤汁。",
  };

  function calculateDishCounts(people) {
    const peopleCount = Number(people);

    if (!Number.isInteger(peopleCount) || peopleCount < 1) {
      throw new Error("People count must be a positive integer.");
    }

    const total = peopleCount + 1;

    return {
      people: peopleCount,
      total,
      meat: Math.ceil(total / 2),
      vegetable: Math.floor(total / 2),
    };
  }

  function getPeopleCountWarning(people) {
    const rawValue = String(people ?? "").trim();
    const peopleCount = Number(rawValue);

    if (rawValue === "" || !Number.isInteger(peopleCount) || peopleCount < 0) {
      return "请输入 1 或更大的整数人数";
    }

    if (peopleCount === 0) {
      return "没人吃什么饭";
    }

    if (peopleCount >= 8) {
      return "家里坐不下那么多人";
    }

    return "";
  }

  function calculateQuantityPlan(people, counts) {
    const peopleCount = Number(people);

    if (!Number.isInteger(peopleCount) || peopleCount < 1) {
      throw new Error("People count must be a positive integer.");
    }

    const meatTotalGrams = peopleCount * GRAMS_PER_PERSON;
    const vegetableTotalGrams = peopleCount * GRAMS_PER_PERSON;

    return {
      gramsPerPerson: GRAMS_PER_PERSON,
      meatTotalGrams,
      vegetableTotalGrams,
      meatPerDishGrams: counts.meat > 0 ? Math.round(meatTotalGrams / counts.meat) : 0,
      vegetablePerDishGrams:
        counts.vegetable > 0 ? Math.round(vegetableTotalGrams / counts.vegetable) : 0,
    };
  }

  function gramsToJin(grams) {
    return grams / 500;
  }

  function formatQuantityLabel(grams, options = {}) {
    const approximate = options.approximate !== false;
    const gramPrefix = approximate ? "约" : "";
    const jin = gramsToJin(grams);

    if (Math.abs(jin - 0.5) <= 0.06) {
      return `${gramPrefix}${grams}g（接近半斤）`;
    }

    return `${gramPrefix}${grams}g（约${jin.toFixed(1)}斤）`;
  }

  function formatNaturalQuantityLabel(ingredientKey, grams) {
    if (ingredientKey === "cabbage") {
      if (grams <= 300) {
        return "约半颗大白菜";
      }

      const cabbageCount = Math.max(1, Math.round(grams / 500));
      return `约${cabbageCount}颗大白菜`;
    }

    const rule = NATURAL_QUANTITY_RULES[ingredientKey];
    if (!rule) {
      return "";
    }

    const rawCount = grams / rule.unitGrams;

    if (rule.rangeWhenBetweenOneAndTwo && rawCount > 1 && rawCount < 1.6) {
      return `约1-2${rule.unitLabel}`;
    }

    const count = Math.max(1, Math.round(rawCount));
    return `约${count}${rule.unitLabel}`;
  }

  function hasSauceForMethod(method) {
    return /汤|咖喱|番茄|炖|焖|煮|水煮|红烧|牛腩|排骨|酸菜|豆瓣|清蒸|蒜蓉粉丝|油焖|豉汁|酱爆/.test(method || "");
  }

  function getRecipeKeyCandidates(dish) {
    const method = dish.method || "";
    const candidates = [];

    if (dish.type && dish.ingredientKey) {
      candidates.push(`${dish.type}.${dish.ingredientKey}.${method}`);
    }

    if (dish.ingredient) {
      candidates.push(`${dish.ingredient}.${method}`);
    }

    candidates.push(method);

    return candidates;
  }

  function getSpecificRecipeForDish(dish) {
    const method = dish.method || "";

    for (const key of getRecipeKeyCandidates(dish)) {
      if (DISH_RECIPES[key]) {
        return DISH_RECIPES[key];
      }
    }

    const methodMatches = Object.entries(DISH_RECIPES).filter(([key]) =>
      key.endsWith(`.${method}`),
    );

    if (dish.ingredient) {
      const ingredientMatch = methodMatches.find(([, recipe]) =>
        recipe.includes(dish.ingredient),
      );

      if (ingredientMatch) {
        return ingredientMatch[1];
      }
    }

    return methodMatches.length === 1 ? methodMatches[0][1] : "";
  }

  function getRecipeForDish(dish) {
    if (dish.recipe) {
      return dish.recipe;
    }

    const ingredient = dish.ingredient || "食材";
    const method = dish.method || "";
    const specificRecipe = getSpecificRecipeForDish(dish);

    if (specificRecipe) {
      return specificRecipe;
    }

    if (method.includes("红烧")) {
      return `${ingredient}切块焯水，炒香葱姜蒜，加入酱油和少量糖翻炒上色，加水炖到软烂后收汁。`;
    }

    if (method.includes("咖喱")) {
      return `${ingredient}切块煎香，加入土豆或胡萝卜和咖喱块，加水煮到汤汁浓稠后出锅。`;
    }

    if (method.includes("番茄")) {
      return `番茄炒出汁，加入${ingredient}翻炒，加少量水煮到入味，最后加盐调味。`;
    }

    if (method.includes("清蒸")) {
      return `${ingredient}处理干净，铺姜片和葱段，上锅蒸熟，出锅后淋蒸鱼豉油和少量热油。`;
    }

    if (method.includes("酸菜")) {
      return `酸菜先炒香，加水煮出汤底，放入${ingredient}煮熟，最后加盐和白胡椒调味。`;
    }

    if (method.includes("豆瓣")) {
      return `豆瓣酱和姜蒜炒香，加入${ingredient}轻轻翻匀，加少量水烧到入味后收汁。`;
    }

    if (method.includes("蒜蓉粉丝")) {
      return `粉丝泡软垫底，铺上${ingredient}和蒜蓉酱，上锅蒸熟，出锅撒葱花。`;
    }

    if (method.includes("白灼")) {
      return `水里加姜片和葱段煮开，放入${ingredient}烫熟，捞出后搭配生抽或蘸料。`;
    }

    if (method.includes("油焖")) {
      return `${ingredient}煎到变色，加入生抽、少量糖和一点水焖入味，最后大火收汁。`;
    }

    if (method.includes("豉汁")) {
      return `豆豉、蒜末和少量生抽调成豉汁，淋在${ingredient}上蒸熟或快炒入味。`;
    }

    if (method.includes("椒盐")) {
      return `${ingredient}擦干水分后煎香或炸香，加入椒盐、葱蒜末快速翻匀。`;
    }

    if (method.includes("香煎")) {
      return `${ingredient}擦干水分，热锅少油两面煎香，撒盐和黑胡椒调味。`;
    }

    if (method.includes("糖醋")) {
      return `${ingredient}切好后裹薄淀粉煎香，倒入糖醋汁翻匀，收汁后出锅。`;
    }

    if (method.includes("凉拌")) {
      return `${ingredient}洗净切好，加入蒜末、盐、醋和少量香油拌匀即可。`;
    }

    if (method.includes("清炒土豆丝") || method.includes("酸辣土豆丝")) {
      return "土豆切丝冲洗淀粉，热锅下油快炒，加盐调味，炒到断生后出锅。";
    }

    if (method.includes("蒜蓉大白菜")) {
      return "大白菜洗净切段，热锅下油炒香蒜末，加入大白菜大火翻炒，加盐调味后出锅。";
    }

    if (method.includes("回锅") || method.includes("小炒")) {
      return `${ingredient}切片煸出香味，加入配菜和调味料大火翻炒，炒匀入味后出锅。`;
    }

    if (method.includes("爆炒") || method.includes("辣炒") || method.includes("葱姜") || method.includes("青椒") || method.includes("铁板")) {
      return `${ingredient}处理干净并沥干水分，热锅大火快炒，加入葱姜或配菜，调味后快速出锅。`;
    }

    if (method.includes("炖") || method.includes("焖") || method.includes("煮")) {
      return `${ingredient}处理好后先煎或焯水，加入姜片和清水炖煮，熟透后加盐调味。`;
    }

    if (method.includes("炒蛋")) {
      return `${ingredient}切好，鸡蛋炒熟盛出，再炒${ingredient}，最后倒回鸡蛋调味炒匀。`;
    }

    if (method.includes("蒜蓉") || method.includes("蒜香")) {
      return `${ingredient}洗净切好，热锅下油炒香蒜末，加入主料快炒，加盐调味后出锅。`;
    }

    if (method.includes("清炒")) {
      return `${ingredient}洗净切好，热锅下油快炒，加盐调味，炒到断生后出锅。`;
    }

    return `${ingredient}处理好，热锅下油翻炒或煎熟，按口味加盐和酱油调味后出锅。`;
  }

  function getCookingTimeMinutes(dish) {
    const method = dish.method || "";

    if (dish.type === "soup") {
      if (method.includes("牛腩")) {
        return 70;
      }
      if (method.includes("排骨")) {
        return 55;
      }
      if (method.includes("番茄蛋")) {
        return 12;
      }
      if (method.includes("紫菜") || method.includes("蔬菜汤")) {
        return 8;
      }
      return 15;
    }

    if (method.includes("酸菜河鱼")) {
      return 30;
    }
    if (method.includes("红烧河鱼") || method.includes("红烧海鱼") || method.includes("豆瓣河鱼") || method.includes("蒜香烤海鱼")) {
      return 25;
    }
    if (method.includes("油焖大虾") || method.includes("蒜蓉粉丝虾") || method.includes("蒜蓉粉丝贝类")) {
      return 18;
    }
    if (method.includes("清蒸河鱼") || method.includes("清蒸海鱼") || method.includes("清蒸贝类") || method.includes("香煎海鱼") || method.includes("番茄海鱼")) {
      return 15;
    }
    if (method.includes("白灼虾")) {
      return 8;
    }
    if (method.includes("虾") || method.includes("贝类") || method.includes("鱿鱼")) {
      return 12;
    }

    if (method.includes("红烧")) {
      return 45;
    }
    if (method.includes("黄焖") || method.includes("炖")) {
      return 35;
    }
    if (method.includes("扣肉")) {
      return 50;
    }
    if (method.includes("咖喱")) {
      return 30;
    }
    if (method.includes("焖")) {
      return 25;
    }
    if (method.includes("水煮")) {
      return 25;
    }
    if (method.includes("糖醋") || method.includes("锅包")) {
      return 20;
    }
    if (method.includes("回锅") || method.includes("小炒") || method.includes("黑椒")) {
      return 15;
    }
    if (method.includes("炒蛋") || method.includes("蒜蓉") || method.includes("蒜香") || method.includes("蚝油")) {
      return 12;
    }
    if (method.includes("清炒") || method.includes("酸辣") || method.includes("白灼")) {
      return 10;
    }
    if (method.includes("凉拌")) {
      return 8;
    }

    return 15;
  }

  function getCookingOrder(menu) {
    return menu
      .map((dish, index) => ({
        ...dish,
        originalIndex: index,
        cookingTimeMinutes:
          dish.cookingTimeMinutes || getCookingTimeMinutes(dish),
      }))
      .sort((a, b) => {
        if (b.cookingTimeMinutes !== a.cookingTimeMinutes) {
          return b.cookingTimeMinutes - a.cookingTimeMinutes;
        }
        return a.originalIndex - b.originalIndex;
      });
  }

  function formatDishQuantityText(dish) {
    if (typeof dish.quantityGrams !== "number") {
      return "";
    }

    const quantity = formatQuantityLabel(dish.quantityGrams);
    const naturalQuantity = formatNaturalQuantityLabel(
      dish.ingredientKey,
      dish.quantityGrams,
    );

    return naturalQuantity ? `${quantity}，${naturalQuantity}` : quantity;
  }

  function dishHasSauce(dish) {
    if (typeof dish.hasSauce === "boolean") {
      return dish.hasSauce;
    }

    return hasSauceForMethod(dish.method);
  }

  function menuHasDryAndWet(menu) {
    const hasWetDish = menu.some((dish) => dishHasSauce(dish));
    const hasDryDish = menu.some((dish) => !dishHasSauce(dish));

    return hasWetDish && hasDryDish;
  }

  function createInitialState(people) {
    const counts = calculateDishCounts(people);
    const quantities = calculateQuantityPlan(counts.people, counts);

    return {
      people: counts.people,
      counts,
      quantities,
      currentType: "meat",
      currentIngredient: null,
      soupPromptAnswered: false,
      menu: [],
    };
  }

  function getRandomIndex(length, random = Math.random) {
    if (length < 1) {
      return -1;
    }

    const rawValue = Number(random());
    const safeValue = Number.isFinite(rawValue)
      ? Math.max(0, Math.min(rawValue, 0.999999))
      : 0;

    return Math.floor(safeValue * length);
  }

  function createDishFromChoice(state, type, ingredientKey, method) {
    const option = DISH_OPTIONS[type]?.[ingredientKey];
    if (!option || !option.methods.includes(method)) {
      throw new Error("Unknown dish choice.");
    }

    const quantityGrams =
      type === "meat"
        ? state.quantities.meatPerDishGrams
        : state.quantities.vegetablePerDishGrams;
    const dish = {
      type,
      ingredientKey,
      ingredient: option.label,
      method,
      quantityGrams,
      hasSauce: hasSauceForMethod(method),
    };

    return {
      ...dish,
      recipe: getRecipeForDish(dish),
      cookingTimeMinutes: getCookingTimeMinutes(dish),
    };
  }

  function listDishCandidates(state, type, saucePreference) {
    return Object.entries(DISH_OPTIONS[type])
      .flatMap(([ingredientKey, option]) =>
        option.methods.map((method) =>
          createDishFromChoice(state, type, ingredientKey, method),
        ),
      )
      .filter((dish) =>
        typeof saucePreference === "boolean"
          ? dishHasSauce(dish) === saucePreference
          : true,
      );
  }

  function pickRandomDish(state, type, random = Math.random, saucePreference) {
    const candidates = listDishCandidates(state, type, saucePreference);
    const candidateIndex = getRandomIndex(candidates.length, random);

    return candidates[candidateIndex] || null;
  }

  function balanceDryAndWetDishes(state, menu, random = Math.random) {
    if (menuHasDryAndWet(menu)) {
      return menu;
    }

    const needsWetDish = !menu.some((dish) => dishHasSauce(dish));
    const replacementIndexes = menu
      .map((dish, index) => ({ dish, index }))
      .sort(() => random() - 0.5);

    for (const { dish, index } of replacementIndexes) {
      const replacement = pickRandomDish(
        state,
        dish.type,
        random,
        needsWetDish,
      );

      if (replacement) {
        const nextMenu = menu.map((item, itemIndex) =>
          itemIndex === index ? replacement : item,
        );

        if (menuHasDryAndWet(nextMenu)) {
          return nextMenu;
        }
      }
    }

    return menu;
  }

  function generateRandomMenuState(people, random = Math.random) {
    const nextState = createInitialState(people);
    const menu = [];

    for (let index = 0; index < nextState.counts.meat; index += 1) {
      menu.push(pickRandomDish(nextState, "meat", random));
    }

    for (let index = 0; index < nextState.counts.vegetable; index += 1) {
      menu.push(pickRandomDish(nextState, "vegetable", random));
    }

    return {
      ...nextState,
      currentType: null,
      currentIngredient: null,
      soupPromptAnswered: false,
      menu: balanceDryAndWetDishes(nextState, menu, random),
    };
  }

  function addDish(state, dish) {
    return {
      ...state,
      menu: [...state.menu, dish],
    };
  }

  function getConsecutiveIngredientNotice(menu, dish) {
    if (!dish || !["meat", "vegetable"].includes(dish.type) || !dish.ingredientKey) {
      return "";
    }

    const recentDishes = [...menu, dish].slice(-3);
    const isSameIngredient =
      recentDishes.length === 3 &&
      recentDishes.every(
        (item) =>
          item.type === dish.type &&
          item.ingredientKey === dish.ingredientKey,
      );

    return isSameIngredient ? `没想到你这么喜欢吃${dish.ingredient}` : "";
  }

  function countDishesByType(state, type) {
    return state.menu.filter((dish) => dish.type === type).length;
  }

  function getNextTypeForMenu(state) {
    if (countDishesByType(state, "meat") < state.counts.meat) {
      return "meat";
    }

    if (countDishesByType(state, "vegetable") < state.counts.vegetable) {
      return "vegetable";
    }

    return null;
  }

  function isMenuComplete(state) {
    return state.menu.length >= state.counts.total;
  }

  function menuNeedsSoupPrompt(state) {
    return (
      isMenuComplete(state) &&
      !state.soupPromptAnswered &&
      !state.menu.some((dish) => dishHasSauce(dish))
    );
  }

  function createSoupDish(soupKey) {
    const soup = SOUP_OPTIONS[soupKey];
    if (!soup) {
      throw new Error("Unknown soup option.");
    }

    const dish = {
      type: "soup",
      ingredientKey: soupKey,
      ingredient: soup.ingredient,
      method: soup.label,
      hasSauce: true,
      recipe: soup.recipe,
    };

    return {
      ...dish,
      cookingTimeMinutes: getCookingTimeMinutes(dish),
    };
  }

  function formatMenuText(state) {
    const soupCount = countDishesByType(state, "soup");
    const totalDishes = state.counts.total + soupCount;
    const dishParts = [`${state.counts.meat} 荤`, `${state.counts.vegetable} 素`];
    if (soupCount > 0) {
      dishParts.push(`${soupCount} 汤`);
    }

    const lines = [
      `今晚 ${state.people} 人吃饭，共 ${totalDishes} 道菜：${dishParts.join(" ")}`,
      `肉类总量：${formatQuantityLabel(state.quantities.meatTotalGrams, { approximate: false })}`,
      `蔬菜总量：${formatQuantityLabel(state.quantities.vegetableTotalGrams, { approximate: false })}`,
      "",
    ];

    state.menu.forEach((dish, index) => {
      const dishQuantityText = formatDishQuantityText(dish);
      const quantityText = dishQuantityText ? `｜建议用量：${dishQuantityText}` : "";
      const sauceText = `｜汤水：${dishHasSauce(dish) ? "有" : "无"}`;
      const cookingTime = dish.cookingTimeMinutes || getCookingTimeMinutes(dish);
      const timeText = `｜时间：约${cookingTime}分钟`;

      lines.push(
        `${index + 1}. [${TYPE_LABELS[dish.type]}] ${dish.ingredient} - ${dish.method}${quantityText}${sauceText}${timeText}`,
      );
      lines.push(`   做法：${getRecipeForDish(dish)}`);
    });

    lines.push("");
    lines.push("烹饪顺序建议：");
    getCookingOrder(state.menu).forEach((dish, index, orderedMenu) => {
      const prefix =
        index === 0 ? "先做" : index === orderedMenu.length - 1 ? "最后做" : "再做";
      lines.push(
        `${index + 1}. ${prefix} ${dish.method}，约${dish.cookingTimeMinutes}分钟`,
      );
    });

    return lines.join("\n");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function initDinnerMenuApp() {
    const app = document.getElementById("app");
    if (!app) {
      return;
    }

    let state = null;
    let history = [];
    let toast = "";

    function cloneStateSnapshot(value) {
      if (!value) {
        return null;
      }

      return {
        ...value,
        counts: { ...value.counts },
        quantities: { ...value.quantities },
        menu: value.menu.map((dish) => ({ ...dish })),
      };
    }

    function setState(nextState, options = {}) {
      if (options.trackHistory !== false) {
        history.push(cloneStateSnapshot(state));
      }

      state = cloneStateSnapshot(nextState);
      toast = "";
      render();
    }

    function canGoBack() {
      return history.length > 0;
    }

    function goBack() {
      if (!canGoBack()) {
        return;
      }

      state = history.pop();
      toast = "";
      render();
    }

    function resetApp() {
      state = null;
      history = [];
      toast = "";
      render();
    }

    function randomizeMenu() {
      if (!state) {
        return;
      }

      setState(generateRandomMenuState(state.people));
    }

    function showPopup(message) {
      if (message && typeof window !== "undefined" && typeof window.alert === "function") {
        window.alert(message);
      }
    }

    function renderNavigationButtons(randomLabel = "随机搭配") {
      const backButton = canGoBack()
        ? '<button class="ghost-button" type="button" data-action="back">返回上一步</button>'
        : "";

      return `
        ${backButton}
        <button class="secondary-button" type="button" data-action="random">${randomLabel}</button>
      `;
    }

    function bindNavigationActions() {
      document.querySelectorAll('[data-action="back"]').forEach((button) => {
        button.addEventListener("click", goBack);
      });

      document.querySelectorAll('[data-action="random"]').forEach((button) => {
        button.addEventListener("click", randomizeMenu);
      });
    }

    function renderMenuList(menu) {
      if (menu.length === 0) {
        return '<p class="empty-menu">还没有选择菜品</p>';
      }

      const items = menu
        .map((dish, index) => {
          const quantityText = formatDishQuantityText(dish);
          return `
            <li class="menu-item">
              <span class="badge">${TYPE_LABELS[dish.type]}</span>
              <div>
                <p class="menu-name">${index + 1}. ${escapeHtml(dish.method)}</p>
                <p class="menu-meta">${escapeHtml(dish.ingredient)}</p>
                ${quantityText ? `<p class="quantity-meta">建议用量：${escapeHtml(quantityText)}</p>` : ""}
                <p class="sauce-meta">汤水：${dishHasSauce(dish) ? "有，好下饭" : "无，偏干"}</p>
                <p class="time-meta">建议时间：约${dish.cookingTimeMinutes || getCookingTimeMinutes(dish)}分钟</p>
                <p class="recipe-meta">做法：${escapeHtml(getRecipeForDish(dish))}</p>
              </div>
            </li>
          `;
        })
        .join("");

      return `<ol class="menu-list">${items}</ol>`;
    }

    function renderStart() {
      app.innerHTML = `
        <section class="panel">
          <h2 class="start-title">今晚几个人吃饭？</h2>
          <p class="summary">输入人数后自动计算菜数、荤素搭配和考虑缩水后的采购量。</p>
          <form id="people-form" class="people-row" novalidate>
            <input
              id="people-count"
              class="people-input"
              type="number"
              inputmode="numeric"
              min="1"
              step="1"
              placeholder="例如 3"
              aria-label="今晚吃饭人数"
            >
            <button class="primary-button" type="submit">开始选择</button>
          </form>
          <p id="people-error" class="error" hidden></p>
        </section>
      `;

      const form = document.getElementById("people-form");
      const input = document.getElementById("people-count");
      const error = document.getElementById("people-error");

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const peopleWarning = getPeopleCountWarning(input.value);
        if (peopleWarning) {
          error.textContent = peopleWarning;
          error.hidden = false;
          showPopup(peopleWarning);
          return;
        }

        try {
          const nextState = createInitialState(input.value);
          setState({
            ...nextState,
            currentType: getNextTypeForMenu(nextState),
          });
        } catch (err) {
          error.textContent = "请输入 1 或更大的整数人数";
          error.hidden = false;
        }
      });
    }

    function renderProgress() {
      const selected = Math.min(state.menu.length, state.counts.total);
      const progress = Math.round((selected / state.counts.total) * 100);

      return `
        <div class="progress">
          <div class="progress-top">
            <span>已选 ${selected}/${state.counts.total}</span>
            <span>${state.counts.meat} 荤 ${state.counts.vegetable} 素</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="--progress: ${progress}%"></div>
          </div>
        </div>
      `;
    }

    function renderStep() {
      const currentType = state.currentType || getNextTypeForMenu(state);
      const currentOptions = DISH_OPTIONS[currentType];
      const selectedOfType = countDishesByType(state, currentType);
      const dishNumber = selectedOfType + 1;
      const typeTotal = state.counts[currentType];
      const quantityGrams =
        currentType === "meat"
          ? state.quantities.meatPerDishGrams
          : state.quantities.vegetablePerDishGrams;
      const isChoosingIngredient = !state.currentIngredient;
      const stepQuantityText =
        currentType === "vegetable" && state.currentIngredient
          ? formatDishQuantityText({
              ingredientKey: state.currentIngredient,
              quantityGrams,
            })
          : formatQuantityLabel(quantityGrams);
      const title = isChoosingIngredient
        ? `第 ${dishNumber}/${typeTotal} 道${TYPE_LABELS[currentType]}菜：选择${currentType === "meat" ? "肉类" : "食材"}`
        : `第 ${dishNumber}/${typeTotal} 道${TYPE_LABELS[currentType]}菜：选择做法`;
      const optionsHtml = isChoosingIngredient
        ? Object.entries(currentOptions)
            .map(
              ([key, option]) => `
                <button class="option-button" type="button" data-ingredient="${key}">
                  ${escapeHtml(option.label)}
                </button>
              `,
            )
            .join("")
        : currentOptions[state.currentIngredient].methods
            .map(
              (method, index) => `
                <button class="option-button" type="button" data-method-index="${index}">
                  ${escapeHtml(method)}
                </button>
              `,
            )
            .join("");

      app.innerHTML = `
        <section class="panel">
          ${renderProgress()}
          <h2 class="step-title">${title}</h2>
          <p class="summary">今晚 ${state.people} 人，共 ${state.counts.total} 道菜。本道建议采购量：${escapeHtml(stepQuantityText)}。</p>
          <div class="option-grid">${optionsHtml}</div>
          <div class="actions flow-actions">
            ${renderNavigationButtons()}
          </div>
        </section>

        <section class="panel menu-preview">
          <h3>当前菜单</h3>
          ${renderMenuList(state.menu)}
        </section>
      `;

      if (isChoosingIngredient) {
        bindNavigationActions();

        document.querySelectorAll("[data-ingredient]").forEach((button) => {
          button.addEventListener("click", () => {
            setState({
              ...state,
              currentIngredient: button.dataset.ingredient,
            });
          });
        });
        return;
      }

      bindNavigationActions();

      document.querySelectorAll("[data-method-index]").forEach((button) => {
        button.addEventListener("click", () => {
          const option = currentOptions[state.currentIngredient];
          const method = option.methods[Number(button.dataset.methodIndex)];
          const selectedDish = createDishFromChoice(
            state,
            currentType,
            state.currentIngredient,
            method,
          );
          const consecutiveNotice = getConsecutiveIngredientNotice(
            state.menu,
            selectedDish,
          );
          const stateWithDish = addDish(
            state,
            selectedDish,
          );
          const nextType = getNextTypeForMenu(stateWithDish);

          setState({
            ...stateWithDish,
            currentType: nextType,
            currentIngredient: null,
          });

          showPopup(consecutiveNotice);
        });
      });
    }

    function renderSoupPrompt() {
      const soupOptionsHtml = Object.entries(SOUP_OPTIONS)
        .map(
          ([key, soup]) => `
            <button class="option-button" type="button" data-soup-key="${key}">
              ${escapeHtml(soup.label)}
            </button>
          `,
        )
        .join("");

      app.innerHTML = `
        <section class="panel">
          <h2 class="step-title">今天的饭菜有点干，要加一道汤吗？</h2>
          <p class="summary">当前选择的菜都没有明显汤水。可以加一道简单汤，让这顿饭更下饭。</p>
          <div class="option-grid soup-grid">${soupOptionsHtml}</div>
          <div class="actions flow-actions">
            <button id="skip-soup" class="ghost-button" type="button">不加汤，直接生成菜单</button>
            ${renderNavigationButtons()}
          </div>
        </section>

        <section class="panel menu-preview">
          <h3>当前菜单</h3>
          ${renderMenuList(state.menu)}
        </section>
      `;

      document.querySelectorAll("[data-soup-key]").forEach((button) => {
        button.addEventListener("click", () => {
          const stateWithSoup = addDish(
            { ...state, soupPromptAnswered: true },
            createSoupDish(button.dataset.soupKey),
          );
          setState(stateWithSoup);
        });
      });

      document.getElementById("skip-soup").addEventListener("click", () => {
          setState({
            ...state,
            soupPromptAnswered: true,
          });
      });

      bindNavigationActions();
    }

    async function copyMenuText(text) {
      const textarea = document.getElementById("menu-text");

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else if (textarea) {
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
        } else {
          throw new Error("No copy target available.");
        }

        toast = "菜单已复制";
      } catch (err) {
        toast = "复制失败，请长按菜单文本手动复制";
      }

      render();
    }

    function downloadMenuText(text) {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const today = new Date().toISOString().slice(0, 10);

      link.href = url;
      link.download = `dinner-menu-${today}.txt`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast = "文本文件已生成";
      render();
    }

    function renderFinal() {
      const menuText = formatMenuText(state);
      const soupCount = countDishesByType(state, "soup");
      const totalDishes = state.counts.total + soupCount;
      const balanceSummary = menuHasDryAndWet(state.menu)
        ? "菜单里已经同时包含有汤水和偏干的菜。"
        : "如果想换成干湿都有的组合，可以点重新随机。";

      app.innerHTML = `
        <section class="panel">
          <h2 class="final-title">今晚菜单定好了</h2>
          <p class="summary">${state.people} 人，${totalDishes} 道菜，按你的选择顺序生成。${balanceSummary}</p>
          <div class="quantity-summary">
            <p>肉类总量：${formatQuantityLabel(state.quantities.meatTotalGrams, { approximate: false })}</p>
            <p>蔬菜总量：${formatQuantityLabel(state.quantities.vegetableTotalGrams, { approximate: false })}</p>
          </div>
          ${renderMenuList(state.menu)}
          <div class="actions flow-actions">
            <button id="copy-menu" class="primary-button" type="button">复制菜单</button>
            <button id="download-menu" class="secondary-button" type="button">下载文本</button>
            ${renderNavigationButtons("重新随机")}
            <button id="restart" class="ghost-button" type="button">重新开始</button>
          </div>
          ${toast ? `<p class="toast">${escapeHtml(toast)}</p>` : ""}
        </section>

        <section class="panel">
          <textarea id="menu-text" class="menu-text" readonly>${escapeHtml(menuText)}</textarea>
        </section>
      `;

      document.getElementById("copy-menu").addEventListener("click", () => {
        copyMenuText(menuText);
      });

      document.getElementById("download-menu").addEventListener("click", () => {
        downloadMenuText(menuText);
      });

      document.getElementById("restart").addEventListener("click", () => {
        resetApp();
      });

      bindNavigationActions();
    }

    function render() {
      if (!state) {
        renderStart();
        return;
      }

      if (menuNeedsSoupPrompt(state)) {
        renderSoupPrompt();
        return;
      }

      if (isMenuComplete(state)) {
        renderFinal();
        return;
      }

      renderStep();
    }

    render();
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initDinnerMenuApp);
    } else {
      initDinnerMenuApp();
    }
  }

  return {
    DISH_OPTIONS,
    DISH_RECIPES,
    SOUP_OPTIONS,
    TYPE_LABELS,
    addDish,
    calculateDishCounts,
    calculateQuantityPlan,
    countDishesByType,
    createInitialState,
    createDishFromChoice,
    createSoupDish,
    dishHasSauce,
    formatDishQuantityText,
    formatMenuText,
    formatNaturalQuantityLabel,
    formatQuantityLabel,
    generateRandomMenuState,
    getCookingOrder,
    getCookingTimeMinutes,
    getConsecutiveIngredientNotice,
    getNextTypeForMenu,
    getPeopleCountWarning,
    getRecipeForDish,
    hasSauceForMethod,
    isMenuComplete,
    menuHasDryAndWet,
    menuNeedsSoupPrompt,
  };
});
