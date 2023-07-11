import { render, screen } from '@testing-library/react'
// const { render,screen } = require('@testing-library/react');
// const AllApplications = require('./AllApplications');
// const { MemoryRouter } = require('react-router-dom');
import { AllApplications } from './AllApplications'
import { MemoryRouter } from 'react-router-dom';
// const fetch = require('node-fetch');
import fetch from 'node-fetch';
// const {React} =  require('react');
import React from 'react';
jest.mock('node-fetch');


test('AllApplications renders correctly', async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve([]),
    });
    render(
        <MemoryRouter>
            <AllApplications />
        </MemoryRouter>
    )
    const BackButton = screen.getByText('Hello')
    expect(BackButton).toBeInTheDocument()
})