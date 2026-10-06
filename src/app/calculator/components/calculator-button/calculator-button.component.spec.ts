describe('AppComponent', () => {
  it('should be 4', () => {
    // Arrange (Preparacion)
    const numb1 = 1;
    const numb2 = 3;

    // Act (Accion)
    const result = numb1 + numb2;

    // Assert (resultado esperado)
    expect(result).toBe(4);
  });
});
