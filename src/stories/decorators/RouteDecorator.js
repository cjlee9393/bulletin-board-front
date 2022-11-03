import { MemoryRouter, Routes, Route } from "react-router-dom"

export const MemoryRouterDecorator = (Story) => (
    <MemoryRouter initialEntries={['/']}>
        <Story />
    </MemoryRouter>
)

export const getDocumentRouteDecorator = (initialEntries, path) => {
    return (Story) => (
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path={path} element={<Story />} />
            </Routes>
        </MemoryRouter>
    )
}