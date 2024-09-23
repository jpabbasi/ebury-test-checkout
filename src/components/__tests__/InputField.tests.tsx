import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../InputField';

describe('InputField Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar um campo de input com os valores corretos', () => {
    render(
      <InputField
        name="testInput"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        type="text"
      />,
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveValue('Test Value');
  });

  it('deve chamar a função onChange ao alterar o valor', () => {
    render(
      <InputField
        name="testInput"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        type="text"
      />,
    );

    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('deve renderizar um campo select quando options são passadas', () => {
    const options = [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
    ];

    render(
      <InputField
        name="testSelect"
        label="Test Select"
        value={1}
        onChange={mockOnChange}
        options={options}
      />,
    );

    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();

    const select = screen.getByLabelText('Test Select') as HTMLSelectElement;
    expect(select).toHaveValue('1');
    expect(select.options[2].text).toBe('Option 2');
  });

  it('deve exibir uma mensagem de erro quando houver erro', () => {
    render(
      <InputField
        name="testInput"
        label="Test Label"
        value=""
        onChange={mockOnChange}
        error="This is an error message"
      />,
    );

    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('deve mostrar o tooltip de informações ao clicar no ícone apenas', () => {
    render(
      <InputField
        name="testInput"
        label="Test Label"
        value=""
        onChange={mockOnChange}
        info="This is info text"
      />,
    );

    expect(screen.queryByText('This is info text')).not.toBeInTheDocument();

    const infoIcon = document.querySelector('.info-icon');
    expect(infoIcon).toBeInTheDocument();
    if (infoIcon) fireEvent.click(infoIcon);

    expect(screen.getByText('This is info text')).toBeInTheDocument();
  });

  it('deve desabilitar o input quando a prop "disabled" é passada', () => {
    render(
      <InputField
        name="testInput"
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        disabled
      />,
    );

    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });
});
