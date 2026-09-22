export const oneOrder = {
  orders: [
    {
      id: 'order-1',
      ownerType: 'user',
      ownerId: 'user-2',
      userId: 'user-2',
      guestSessionId: null,
      items: [
        {
          id: 'cat-1',
          name: 'Маргарита',
          basePrice: 3500,
          price: 3500,
          options: {
            furType: 'Средняя',
            activityLevel: 'Игровой',
            extras: [],
          },
          quantity: 1,
        },
      ],
      totalPrice: 3500,
      customer: {
        city: '1',
        street: '1',
        house: '1',
        apartment: '',
        comment: '',
        payment: 'card',
      },
      createdAt: '2026-09-22T15:29:05.452Z',
    },
  ],
};

export const emptyOrders = {
  orders: [],
};
