// app/admin/[[...index]]/layout.tsx

export const metadata = {
  title: 'Sanity Studio',
  description: 'Panel de administración de contenido',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  )
}