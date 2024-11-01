import { FiUsers, FiEdit } from "react-icons/fi";

export const menuDrinks = {
  bebidas: {
    aguaESucos: {
      title: { es: "Agua y Jugos", pt: "Água e Sucos", en: "Water and Juices" },
      picUrl: "/water.png",
      items: [
        {
          name: { es: "Agua Sin Gas", pt: "Água Sem Gás", en: "Still Water" },
          price: "R$ 6,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: {
            es: "Agua Con Gas",
            pt: "Água Com Gás",
            en: "Sparkling Water",
          },
          price: "R$ 6,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: { es: "Agua Tónica", pt: "Água Tônica", en: "Tonic Water" },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Jugo de Frutas",
            pt: "Suco De Frutas",
            en: "Fruit Juice",
          },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Jugo de Naranja",
            pt: "Suco De Laranja",
            en: "Orange Juice",
          },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Energético TNT",
            pt: "Energético TNT",
            en: "TNT Energy Drink",
          },
          price: "R$ 15,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    refrigerantes: {
      title: { es: "Refrescos", pt: "Refrigerantes", en: "Soft Drinks" },
      picUrl: "/softDrinks.png",
      items: [
        {
          name: { es: "Coca Cola", pt: "Coca Cola", en: "Coca Cola" },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: { es: "Coca Cola Zero", pt: "Coca Zero", en: "Coca Cola Zero" },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: { es: "Guaraná", pt: "Guaraná", en: "Guarana" },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: {
            es: "Fanta Naranja",
            pt: "Fanta Laranja",
            en: "Fanta Orange",
          },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: { es: "Sprite", pt: "Sprite", en: "Sprite" },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
        {
          name: { es: "Citrus", pt: "Citrus", en: "Citrus" },
          price: "R$ 7,00",
          info: { es: "350ml", pt: "350ml", en: "350ml" },
        },
      ],
    },
    cervejas: {
      title: { es: "Cervezas", pt: "Cervejas", en: "Beers" },
      picUrl: "/beer.png",
      items: [
        {
          name: {
            es: "Cerveza Sin Alcohol",
            pt: "Cerveja Sem Alcool",
            en: "Non-Alcoholic Beer",
          },
          price: "R$ 12,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Heineken", pt: "Heineken", en: "Heineken" },
          price: "R$ 12,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Eisenbahn", pt: "Eisenbahn", en: "Eisenbahn" },
          price: "R$ 10,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Malzbier", pt: "Malzbier", en: "Malzbier" },
          price: "R$ 10,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Brahma Doble Malta",
            pt: "Brahma Duplo Malte",
            en: "Brahma Double Malt",
          },
          price: "R$ 10,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Petra", pt: "Petra", en: "Petra" },
          price: "R$ 9,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Skol", pt: "Skol", en: "Skol" },
          price: "R$ 9,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Itaipava Pilsen",
            pt: "Itaipava Pilsen",
            en: "Itaipava Pilsner",
          },
          price: "R$ 8,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    licores: {
      title: { es: "Licores", pt: "Licores", en: "Liqueurs" },
      picUrl: "/liqueur.png",
      items: [
        {
          name: {
            es: "Licor de Amarula",
            pt: "Licor De Amarula",
            en: "Amarula Liqueur",
          },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Licor Cointreau",
            pt: "Licor Cointreau",
            en: "Cointreau Liqueur",
          },
          price: "R$ 20,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Licor Drambuie",
            pt: "Licor Drambuie",
            en: "Drambuie Liqueur",
          },
          price: "R$ 21,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    cafe: {
      title: { es: "Café", pt: "Café", en: "Coffee" },
      picUrl: "/coffee.png",
      items: [
        {
          name: { es: "Café Expreso", pt: "Café Expresso", en: "Espresso" },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Café Simple", pt: "Café Simples", en: "Black Coffee" },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Jarra de Café", pt: "Bule De Café", en: "Coffee Pot" },
          price: "R$ 14,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Jarra de Leche", pt: "Bule De Leite", en: "Milk Pot" },
          price: "R$ 14,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Chocolate Caliente",
            pt: "Chocolate Quente",
            en: "Hot Chocolate",
          },
          price: "R$ 10,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Cappuccino", pt: "Cappuccino", en: "Cappuccino" },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Té", pt: "Chá", en: "Tea" },
          price: "R$ 7,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    bebidasEmDose: {
      title: { es: "Bebidas en Shots", pt: "Bebidas em Dose", en: "Spirits" },
      picUrl: "/spirits.png",
      items: [
        {
          name: {
            es: "Whisky Johnnie Walker Red (8 Años)",
            pt: "Whisky Johnnie Walker Red (8 Anos)",
            en: "Johnnie Walker Red Whisky (8 Years)",
          },
          price: "R$ 20,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Whisky Johnnie Walker Black (12 Años)",
            pt: "Whisky Johnnie Walker Black (12 Anos)",
            en: "Johnnie Walker Black Whisky (12 Years)",
          },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Whisky Jack Daniel's",
            pt: "Whisky Jack Daniel’s",
            en: "Jack Daniel’s Whisky",
          },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Gin", pt: "Gin", en: "Gin" },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Martini (Rose, Dry y Bianco)",
            pt: "Martini (Rose, Dry E Bianco)",
            en: "Martini (Rosé, Dry, and Bianco)",
          },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Campari", pt: "Campari", en: "Campari" },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Tequila", pt: "Tequila", en: "Tequila" },
          price: "R$ 20,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Cachaça Velho Barreiro",
            pt: "Cachaça Velho Barreiro",
            en: "Velho Barreiro Cachaça",
          },
          price: "R$ 6,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Cachaça São Francisco",
            pt: "Cachaça São Francisco",
            en: "São Francisco Cachaça",
          },
          price: "R$ 8,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Coñac Domecq",
            pt: "Conhaque Domec",
            en: "Domecq Cognac",
          },
          price: "R$ 17,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    drinks: {
      title: { es: "Tragos", pt: "Drinks", en: "Cocktails" },
      picUrl: "/cocktails.png",
      items: [
        {
          name: {
            es: "Caipirinha de Cachaça",
            pt: "Caipirinha Cachaça",
            en: "Cachaça Caipirinha",
          },
          price: "R$ 18,00",
          info: { es: "CACHAÇA", pt: "CACHAÇA", en: "CACHAÇA" },
        },
        {
          name: { es: "Caipiroska", pt: "Caipiroska", en: "Caipiroska" },
          price: "R$ 20,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Caipifruta de Cachaça (Fresa o Kiwi)",
            pt: "Caipifruta Cachaça (Morango Ou Kiwi)",
            en: "Cachaça Fruit Caipirinha (Strawberry or Kiwi)",
          },
          price: "R$ 22,00",
          info: { es: "CACHAÇA", pt: "CACHAÇA", en: "CACHAÇA" },
        },
        {
          name: {
            es: "Caipifruta de Vodka (Fresa o Kiwi)",
            pt: "Caipifruta De Vodka (Morango Ou Kiwi)",
            en: "Vodka Fruit Caipirinha (Strawberry or Kiwi)",
          },
          price: "R$ 24,00",
          info: { es: "VODKA", pt: "VODKA", en: "VODKA" },
        },
        {
          name: { es: "Caipiríssima", pt: "Caipiríssima", en: "Caipirissima" },
          price: "R$ 22,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Cuba Libre (Vodka o Ron)",
            pt: "Cuba Libre (Vodka Ou Rum)",
            en: "Cuba Libre (Vodka or Rum)",
          },
          price: "R$ 28,00",
          info: { es: "VODKA O RUM", pt: "VODKA OU RUM", en: "VODKA OR RUM" },
        },
        {
          name: { es: "Gin Tonic", pt: "Gin Tônica", en: "Gin Tonic" },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Cóctel de Frutas",
            pt: "Coquetel De Frutas",
            en: "Fruit Cocktail",
          },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: {
            es: "Cóctel de Frutas Sin Alcohol",
            pt: "Coquetel De Frutas Sem Alcool",
            en: "Non-Alcoholic Fruit Cocktail",
          },
          price: "R$ 18,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Mojito", pt: "Mojito", en: "Mojito" },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Piña Colada", pt: "Piña Colada", en: "Pina Colada" },
          price: "R$ 25,00",
          info: { es: "", pt: "", en: "" },
        },
        {
          name: { es: "Margarita", pt: "Margarita", en: "Margarita" },
          price: "R$ 21,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
  },
};

export const menuDishes = {
  pratos: {
    entradas: {
      title: { es: "Entradas", pt: "Entradas", en: "Appetizers" },
      picUrl: "/appetizers.png",
      items: [
        {
          name: {
            es: "Ensalada Colonial",
            pt: "Salada Colonial",
            en: "Colonial Salad",
          },
          price: "R$29,00",
          info: {
            es: "Mezcla de hojas, tomates laminados, encurtidos, cebolla, queso blanco y croutones con aderezo de limón.",
            pt: "Mix de folhas, tomates laminados, picles, cebola, queijo branco e crótons ao molho de limão.",
            en: "Mix of leaves, sliced tomatoes, pickles, onions, white cheese, and croutons with lemon dressing.",
          },
        },
        {
          name: {
            es: "Ensalada Ejecutiva",
            pt: "Salada Executiva",
            en: "Executive Salad",
          },
          price: "R$18,00",
          info: {
            es: "Pequeño bouquet de hojas, tomate y cebolla, acompañamiento perfecto para parrilladas.",
            pt: "Pequeno buquê de folhas, tomate e cebola, perfeito acompanhamento para grelhados.",
            en: "Small bouquet of leaves, tomato, and onion, perfect side for grilled meats.",
          },
        },
        {
          name: {
            es: "Sopa Brasileña de Pollo",
            pt: "Canja à Brasileira",
            en: "Brazilian Chicken Soup",
          },
          price: "R$24,00",
          info: {
            es: "Sopa de pollo desmenuzado con zanahorias y hierbas en caldo de gallina.",
            pt: "Sopa de frango desfiado com cenouras e ervas no caldo de galinha.",
            en: "Shredded chicken soup with carrots and herbs in chicken broth.",
          },
        },
        {
          name: {
            es: "Crema de Verduras",
            pt: "Creme de Legumes",
            en: "Vegetable Cream",
          },
          price: "R$24,00",
          info: {
            es: "Crema de vegetales con papa, cebolla, tomates, puerro, apio y nabo; perfecto para dietas.",
            pt: "Creme de vegetais composto por batata, cebola, tomates, alho-poró, salsão e nabo; perfeito para dietas.",
            en: "Cream of vegetables with potato, onion, tomatoes, leek, celery, and turnip; perfect for diets.",
          },
        },
      ],
    },
    porcoes: {
      title: { es: "Porciones", pt: "Porções", en: "Side Dishes" },
      picUrl: "/fries.png",
      items: [
        {
          name: { es: "Papas Fritas", pt: "Batata Frita", en: "French Fries" },
          price: "R$24,00",
          info: { es: "400gr", pt: "400gr", en: "400g" },
        },
        {
          name: {
            es: "Papas Fritas con Queso y Bacon",
            pt: "Batata Frita com Queijo e Bacon",
            en: "French Fries with Cheese and Bacon",
          },
          price: "R$30,00",
          info: { es: "400gr", pt: "400gr", en: "400g" },
        },
        {
          name: {
            es: "Salchicha Calabresa con Cebolla",
            pt: "Calabresa Acebolada",
            en: "Sautéed Calabresa Sausage",
          },
          price: "R$38,00",
          info: { es: "400gr", pt: "400gr", en: "400g" },
        },
        {
          name: {
            es: "Tiras de Mignon",
            pt: "Iscas de Mignon",
            en: "Mignon Strips",
          },
          price: "R$54,90",
          info: { es: "400gr", pt: "400gr", en: "400g" },
        },
        {
          name: {
            es: "Pollo Frito al Estilo Brasileño",
            pt: "Frango à Passarinho",
            en: "Brazilian Style Fried Chicken",
          },
          price: "R$34,90",
          info: { es: "800gr", pt: "800gr", en: "800g" },
        },
        {
          name: {
            es: "Tiras de Tilapia",
            pt: "Iscas de Tilápia",
            en: "Tilapia Strips",
          },
          price: "R$46,00",
          info: { es: "400gr", pt: "400gr", en: "400g" },
        },
        {
          name: {
            es: "Tabla de Fiambres",
            pt: "Tábua de Frios",
            en: "Cold Cuts Platter",
          },
          price: "R$56,00",
          info: { es: "", pt: "", en: "" },
        },
      ],
    },
    massas: {
      title: { es: "Pastas", pt: "Massas", en: "Pasta" },
      picUrl: "/pasta.png",
      items: [
        {
          name: {
            es: "Espagueti a la Boloñesa",
            pt: "Espaguete à Bolonhesa",
            en: "Spaghetti Bolognese",
          },
          price: "R$36,00",
          info: {
            es: "Espagueti servido con salsa boloñesa.",
            pt: "Espaguete servido ao molho bolonhesa.",
            en: "Spaghetti served with bolognese sauce.",
          },
        },
        {
          name: {
            es: "Espagueti al Sugo / Ajo y Aceite",
            pt: "Espaguete ao Sugo / Alho e Óleo",
            en: "Spaghetti with Tomato Sauce / Garlic & Oil",
          },
          price: "R$36,00",
          info: {
            es: "Espagueti con salsa de tomate / Espagueti con ajo y aceite.",
            pt: "Espaguete ao molho pomodoro / Espaguete ao alho e óleo.",
            en: "Spaghetti with tomato sauce / Spaghetti with garlic and oil.",
          },
        },
      ],
    },
    peixes: {
      title: {
        es: "Pescados y Mariscos",
        pt: "Peixes e Crustáceos",
        en: "Fish & Seafood",
      },
      picUrl: "/fish.png",
      items: [
        {
          name: {
            es: "Filete de Tilapia al Aroma de Moqueca",
            pt: "Filé de Tilápia ao Aroma de Moqueca",
            en: "Tilapia Fillet with Moqueca Aroma",
          },
          price: "R$48,00",
          info: {
            es: "Filete de tilapia a la parrilla con aroma de moqueca, servido con arroz de coco.",
            pt: "Filé de tilápia grelhado ao aroma de moqueca, servido com arroz de coco.",
            en: "Grilled tilapia fillet with moqueca aroma, served with coconut rice.",
          },
        },
        {
          name: {
            es: "Filete de Tilapia Empanado con Salsa Tártara",
            pt: "Filé de Tilápia Empanado ao Molho Tártaro",
            en: "Breaded Tilapia Fillet with Tartar Sauce",
          },
          price: "R$46,00",
          info: {
            es: "Filete de tilapia empanado con salsa tártara, mini ensalada y arroz blanco.",
            pt: "Filé de tilápia empanado acompanhado de molho tártaro, mini salada e arroz branco.",
            en: "Breaded tilapia fillet with tartar sauce, mini salad, and white rice.",
          },
        },
        {
          name: {
            es: "Filete de Tilapia con Salsa de Limón",
            pt: "Filé de Tilápia ao Molho de Limão",
            en: "Tilapia Fillet with Lemon Sauce",
          },
          price: "R$46,00",
          info: {
            es: "Filete de tilapia a la parrilla con salsa de limón, arroz y papas fritas.",
            pt: "Filé de tilápia grelhado ao molho de limão, arroz e fritas.",
            en: "Grilled tilapia fillet with lemon sauce, rice, and fries.",
          },
        },
      ],
    },
    carnesFrango: {
      title: { es: "Carnes de Pollo", pt: "Carnes Frango", en: "Chicken" },
      picUrl: "/chicken.png",
      items: [
        {
          name: {
            es: "Filete de Pollo Ejecutivo",
            pt: "Filé de Frango Executivo",
            en: "Executive Chicken Fillet",
          },
          price: "R$39,00",
          info: {
            es: "Pechuga de pollo a la parrilla, arroz blanco, papas fritas, mini ensalada y huevo frito.",
            pt: "Peito de frango grelhado, arroz branco, batata frita, mini salada e ovo frito.",
            en: "Grilled chicken breast, white rice, French fries, mini salad, and fried egg.",
          },
        },
        {
          name: {
            es: "Filete de Pollo a la Parrilla",
            pt: "Filé de Frango Grelhado",
            en: "Grilled Chicken Fillet",
          },
          price: "R$46,00",
          info: {
            es: "Filete de pechuga de pollo a la parrilla con arroz y papas fritas.",
            pt: "Filé de peito de frango grelhado, com arroz e fritas.",
            en: "Grilled chicken breast fillet with rice and fries.",
          },
        },
      ],
    },
    carnesBovinas: {
      title: { es: "Carnes Bovinas", pt: "Carnes Bovinas", en: "Beef" },
      picUrl: "/beef.png",
      items: [
        {
          name: {
            es: "Picaña Grillada",
            pt: "Picanha Grelhada",
            en: "Grilled Picanha",
          },
          price: "R$96,00",
          info: {
            es: "Picaña grillada, servida con arroz, farofa, papas fritas y salsa vinagreta.",
            pt: "Picanha grelhada, servida com arroz, farofa, fritas e vinagrete.",
            en: "Grilled picanha, served with rice, farofa, fries, and vinaigrette.",
          },
        },
        {
          name: {
            es: "Bife de Chorizo",
            pt: "Bife de Chorizo",
            en: "Ribeye Steak",
          },
          price: "R$92,00",
          info: {
            es: "Bife de chorizo a la parrilla con arroz y papas fritas.",
            pt: "Bife de chorizo grelhado, com arroz e fritas.",
            en: "Grilled ribeye steak with rice and fries.",
          },
        },
      ],
    },
    pizzas: {
      title: { es: "Pizzas", pt: "Pizzas", en: "Pizzas" },
      picUrl: "/pizza.png",
      items: [
        {
          name: {
            es: "Pizza Margarita",
            pt: "Pizza Margherita",
            en: "Margherita Pizza",
          },
          price: "R$48,00",
          info: {
            es: "Pizza de mozzarella, tomate, albahaca fresca y aceite de oliva.",
            pt: "Pizza de mussarela, tomate, manjericão fresco e azeite de oliva.",
            en: "Mozzarella pizza with tomato, fresh basil, and olive oil.",
          },
        },
        {
          name: {
            es: "Pizza Pepperoni",
            pt: "Pizza de Pepperoni",
            en: "Pepperoni Pizza",
          },
          price: "R$52,00",
          info: {
            es: "Pizza de mozzarella con pepperoni.",
            pt: "Pizza de mussarela com pepperoni.",
            en: "Mozzarella pizza with pepperoni.",
          },
        },
      ],
    },
  },
};

export const adminMenuItems = [
  {
    title: "Gestão do Restaurante",
    links: [
      {
        label: "Cardapio",
        icon: <FiUsers className="h-3 w-3" />, // Ícono para Lista de Clientes
        submenu: [
          { label: "Pratos", href: "/admin/dashboard/menu/dishes" },
          { label: "Bebidas", href: "/admin/dashboard/menu/drinks" },
        ],
      },
      {
        label: "Lista de pedidos",
        icon: <FiEdit className="h-3 w-3" />, // Ícono para Editar Benefício
        submenu: [
          {
            label: "Novos (pendentes)",
            href: "/admin/dashboard/orders/new",
          },
          {
            label: "Em preparação",
            href: "/admin/dashboard/orders/preparation",
          },
          {
            label: "Prontos",
            href: "/admin/dashboard/orders/completed",
          },
          {
            label: "Todos",
            href: "/admin/dashboard/orders/all",
          },

          {
            label: "Cancelados",
            href: "/admin/dashboard/orders/canceled",
          },
        ],
      },
    ],
  },
];

export const menuPratos = {
  pratos: {
    entradas: {
      title: "Entradas",
      picUrl: "/appetizers.png",
      items: [
        {
          name: "Salada Colonial",
          price: "R$29,00",
          info: "Mix de Folhas, tomates lâminados, picles, cebola, queijo branco e crótons ao molho de limão.",
        },
        {
          name: "Salada Executiva",
          price: "R$18,00",
          info: "Pequeno buquê de folhas, tomate e cebola, perfeito acompanhamento para grelhados.",
        },
        {
          name: "Canja à Brasileira",
          price: "R$24,00",
          info: "Sopa de frango desfiado com cenouras e ervas no caldo de galinha.",
        },
        {
          name: "Creme de Legumes",
          price: "R$24,00",
          info: "Creme de vegetais composto por batata, cebola, tomates, alho-porró, salsão e nabo; perfeito para dietas.",
        },
      ],
    },
    porcoes: {
      title: "Porções",
      picUrl: "/fries.png",
      items: [
        { name: "Batata Frita", price: "R$24,00", info: "400gr" },
        {
          name: "Batata Frita com Queijo e Bacon",
          price: "R$30,00",
          info: "400gr",
        },
        { name: "Calabresa Acebolada", price: "R$38,00", info: "400gr" },
        { name: "Iscas de Mignon", price: "R$54,90", info: "400gr" },
        { name: "Frango à Passarinho", price: "R$34,90", info: "800gr" },
        { name: "Iscas de Tilápia", price: "R$46,00", info: "400gr" },
        { name: "Tábua de Frios", price: "R$56,00", info: "" },
      ],
    },
    massas: {
      title: "Massas",
      picUrl: "/pasta.png",
      items: [
        {
          name: "Espaguete à Bolonhesa",
          price: "R$36,00",
          info: "Espaguete servido ao molho bolonhesa.",
        },
        {
          name: "Espaguete ao Sugo / Alho e Óleo",
          price: "R$36,00",
          info: "Espaguete ao molho pomodoro / Espaguete ao alho e óleo.",
        },
      ],
    },
    peixes: {
      title: "Peixes e Crustáceos",
      picUrl: "/fish.png",
      items: [
        {
          name: "Filé de Tilápia ao Aroma de Moqueca",
          price: "R$48,00",
          info: "Filé de tilápia grelhado ao aroma de moqueca, servido com arroz de coco.",
        },
        {
          name: "Filé de Tilápia Empanado ao Molho Tártaro",
          price: "R$46,00",
          info: "Filé de tilápia empanado acompanhado de molho tártaro, mini salada e arroz branco.",
        },
        {
          name: "Filé de Tilápia ao Molho de Limão",
          price: "R$46,00",
          info: "Filé de tilápia grelhado ao molho de limão, arroz e fritas.",
        },
      ],
    },
    carnesFrango: {
      title: "Carnes Frango",
      picUrl: "/chicken.png",
      items: [
        {
          name: "Filé de Frango Executivo",
          price: "R$39,00",
          info: "Peito de frango grelhado, arroz branco, batata frita, mini salada e ovo frito.",
        },
        {
          name: "Frango à Tropical",
          price: "R$39,00",
          info: "Coxa e Sobrecoxa grelhadas acompanhadas de arroz à grega e molho de Laranja.",
        },
        {
          name: "Clássico Parmegiana",
          price: "R$38,00",
          info: "Filé de frango empanado e gratinado ao molho de tomate e queijo mozzarella, acompanha arroz e batata frita.",
        },
        {
          name: "Strogonoff de Frango",
          price: "R$36,00",
          info: "Strogonoff de frango, arroz e batata palha.",
        },
      ],
    },
    carnesBovinas: {
      title: "Carnes Bovinas",
      picUrl: "/beef.png",
      items: [
        {
          name: "Filé Mignon Colonial",
          price: "R$59,00",
          info: "Filé gratinado em manteiga de Bourbugnone, arroz branco, couve refogada, ovo frito e batata frita.",
        },
        {
          name: "Filé Monte Carlo",
          price: "R$58,00",
          info: "Filé grelhado com crocante de folhas ao molho cremoso de queijo, acompanha batatas fritas.",
        },
        {
          name: "Paillard de Filé à Arrabiatta",
          price: "R$56,00",
          info: "Paillard de Filé acompanhado de espaguete com pomodoro picante.",
        },
        {
          name: "Contra Filé à Brasileira",
          price: "R$54,00",
          info: "Bife de contra filé grelhado acompanha vinagrete, farofa, arroz branco e batata frita.",
        },
      ],
    },
    pizzaBrotinho: {
      title: "Pizza Brotinho",
      picUrl: "/pizza.png",
      items: [
        {
          name: "Calabresa",
          price: "R$29,00",
          info: "Molho de tomate, mussarela, calabresa, cebola e orégano.",
        },
        {
          name: "Portuguesa",
          price: "R$29,00",
          info: "Molho de tomate, mussarela, presunto, ovos, cebola, azeitona, pimentão, tomate e orégano.",
        },
        {
          name: "Namorado",
          price: "R$29,00",
          info: "Molho de tomate, mussarela, palmito picado e catupiry.",
        },
        {
          name: "Banana com Canela",
          price: "R$29,00",
          info: "Mussarella, banana picada, leite condensado e canela em pó.",
        },
        {
          name: "Frango com Catupiry",
          price: "R$29,00",
          info: "Molho de tomate, mussarela, frango desfiado, requeijão e orégano.",
        },
        {
          name: "Mussarela",
          price: "R$29,00",
          info: "Molho de tomate, queijo mussarela, tomate e orégano.",
        },
        {
          name: "Alhobresa",
          price: "R$29,00",
          info: "Molho de tomate, mussarella, alho frito e calabresa.",
        },
      ],
    },
    sanduiches: {
      title: "Sanduíches",
      picUrl: "/sandwich.png",
      items: [
        {
          name: "Colonial Burger",
          price: "R$24,00",
          info: "Pão de hambúrguer, maionese caseira, hambúrguer artesanal, queijo mussarela e batata frita.",
        },
        {
          name: "Clássico Colonial",
          price: "R$26,00",
          info: "Pão de hambúrguer, hambúrguer artesanal, queijo mussarela, alface, tomate, cebola ao molho de limão e batata frita.",
        },
        {
          name: "Colonial BBQ",
          price: "R$26,00",
          info: "Pão de hambúrguer, hambúrguer artesanal, queijo mussarela, bacon ao molho barbecue e batata frita.",
        },
        {
          name: "Top Colonial",
          price: "R$29,00",
          info: "Pão de hambúrguer, maionese caseira, hambúrguer artesanal, queijo mussarela, alface, bacon ao molho colonial e batata frita.",
        },
        {
          name: "Misto Quente",
          price: "R$18,00",
          info: "Pão de forma, fatias de queijo e presunto.",
        },
      ],
    },
    sobremesas: {
      title: "Sobremesas",
      picUrl: "/dessert.png",
      items: [
        { name: "Pudim de Leite Condensado", price: "R$21,00", info: "110g" },
        { name: "Petit Gateau", price: "R$28,00", info: "" },
        { name: "Torta Banoffee", price: "R$18,00", info: "110g" },
        { name: "Torta Cheesecake", price: "R$18,00", info: "110g" },
        { name: "Torta Tiramisu", price: "R$18,00", info: "110g" },
        { name: "Torta de Abacaxi", price: "R$18,00", info: "110g" },
        { name: "Torta Holandesa", price: "R$18,00", info: "110g" },
        { name: "Torta de Limão", price: "R$18,00", info: "110g" },
        { name: "Salada de Frutas", price: "R$18,00", info: "" },
        {
          name: "Açaí Camadinha",
          price: "R$28,00",
          info: "",
        },
      ],
    },
  },
};

export const addToCartText = {
  pt: "Adicionar",
  es: "Agregar",
  en: "Add",
};

export const addedToCartText = {
  pt: "Adicionado",
  es: "Agregado",
  en: "Added",
};

export const dishesText = {
  pt: "Pratos",
  es: "Platos",
  en: "Dishes",
};

export const drinksText = {
  pt: "Bebidas",
  es: "Bebidas",
  en: "Drinks",
};

export const noDishesText = {
  pt: "Não há pratos disponíveis",
  es: "No hay platos disponibles",
  en: "No dishes available",
};

export const welcomeText = {
  pt: "Prezados Hóspedes, aproveitem sua estadia! Não cobramos taxa de serviço.",
  es: "Estimados Huéspedes, ¡disfruten de su estancia! No cobramos tarifa de servicio.",
  en: "Dear Guests, enjoy your stay! We do not charge a service fee.",
};

export const productText = {
  pt: "Meus productos",
  es: "Mis productos",
  en: "My products",
};

export const myCardText = {
  pt: "Meu carrinho",
  es: "Mi carrito",
  en: "My cart",
};

export const emptyCartText = {
  pt: "Seu carrinho está vazio.",
  es: "Su carrito está vacío.",
  en: "Your cart is empty.",
};

export const finalizeOrderText = {
  pt: "Finalizar pedido",
  es: "Finalizar pedido",
  en: "Finalize order",
};

export const nameText = {
  pt: "Nome",
  es: "Nombre",
  en: "Name",
};

export const roomNumberText = {
  pt: "Número do Quarto",
  es: "Número de la Habitación",
  en: "Room Number",
};

export const closeText = {
  pt: "Fechar",
  es: "Cerrar",
  en: "Close",
};

export const confirmOrderText = {
  pt: "Confirmar pedido",
  es: "Confirmar pedido",
  en: "Confirm order",
};

export const buttonText = {
  pt: {
    confirm: "Sim, confirmar",
    cancel: "Cancelar",
  },
  es: {
    confirm: "Sí, confirmar",
    cancel: "Cancelar",
  },
  en: {
    confirm: "Yes, confirm",
    cancel: "Cancel",
  },
};
