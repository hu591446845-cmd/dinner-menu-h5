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

  function getRecipeForDish(dish) {
    if (dish.recipe) {
      return dish.recipe;
    }

    const ingredient = dish.ingredient || "食材";
    const method = dish.method || "";

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
          const stateWithDish = addDish(
            state,
            createDishFromChoice(
              state,
              currentType,
              state.currentIngredient,
              method,
            ),
          );
          const nextType = getNextTypeForMenu(stateWithDish);

          setState({
            ...stateWithDish,
            currentType: nextType,
            currentIngredient: null,
          });
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
    getNextTypeForMenu,
    getRecipeForDish,
    hasSauceForMethod,
    isMenuComplete,
    menuHasDryAndWet,
    menuNeedsSoupPrompt,
  };
});
