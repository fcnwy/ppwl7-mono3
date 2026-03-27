import { useEffect, useState } from "react"
import type { User, ApiResponse } from "shared"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function App() {
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users`)
    const data: ApiResponse<User[]> = await res.json()

    setUsers(data.data)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="flex justify-center p-10">

      <Card className="w-150">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent>

          <Button onClick={loadUsers} className="mb-4">
            Refresh
          </Button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>

        </CardContent>
      </Card>

    </div>
  )
}