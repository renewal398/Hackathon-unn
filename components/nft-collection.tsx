"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Calendar, Star } from "lucide-react"
import { useAuth } from "@/components/auth-context"

const rarityColors = {
  common: "bg-gray-100 text-gray-800 border-gray-300",
  rare: "bg-blue-100 text-blue-800 border-blue-300",
  epic: "bg-purple-100 text-purple-800 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 border-yellow-300",
}

const rarityIcons = {
  common: "⚪",
  rare: "🔵",
  epic: "🟣",
  legendary: "🟡",
}

export default function NFTCollection() {
  const { user } = useAuth()
  const nfts = user?.nfts || []

  const stats = {
    total: nfts.length,
    common: nfts.filter((nft) => nft.rarity === "common").length,
    rare: nfts.filter((nft) => nft.rarity === "rare").length,
    epic: nfts.filter((nft) => nft.rarity === "epic").length,
    legendary: nfts.filter((nft) => nft.rarity === "legendary").length,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">NFT Collection</h1>
                <p className="text-gray-600 mt-1">Your earned sustainability badges and certificates</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total NFTs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">⚪</div>
              <div className="text-lg font-bold">{stats.common}</div>
              <div className="text-sm text-gray-600">Common</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🔵</div>
              <div className="text-lg font-bold">{stats.rare}</div>
              <div className="text-sm text-gray-600">Rare</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🟣</div>
              <div className="text-lg font-bold">{stats.epic}</div>
              <div className="text-sm text-gray-600">Epic</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🟡</div>
              <div className="text-lg font-bold">{stats.legendary}</div>
              <div className="text-sm text-gray-600">Legendary</div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Grid */}
        {nfts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">No NFTs Yet</CardTitle>
              <CardDescription className="mb-6">
                Complete lessons and quizzes to earn your first NFT badges!
              </CardDescription>
              <Link to="/lessons">
                <Button className="bg-green-600 hover:bg-green-700">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft) => (
              <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-200 relative">
                  <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge className={`${rarityColors[nft.rarity]} border`}>
                      {rarityIcons[nft.rarity]} {nft.rarity}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">NFT #{nft.id.slice(-4)}</div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{nft.name}</CardTitle>
                  <CardDescription className="text-sm">{nft.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(nft.earnedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {nft.rarity}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Achievement Milestones */}
        {nfts.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Achievement Milestones</CardTitle>
              <CardDescription>Unlock special rewards as you progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">First Steps</div>
                      <div className="text-sm text-gray-600">Earn your first NFT</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed ✓</Badge>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    stats.total >= 5 ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className={`h-8 w-8 ${stats.total >= 5 ? "text-green-600" : "text-gray-400"}`} />
                    <div>
                      <div className="font-medium">Collector</div>
                      <div className="text-sm text-gray-600">Earn 5 NFTs ({stats.total}/5)</div>
                    </div>
                  </div>
                  <Badge className={stats.total >= 5 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                    {stats.total >= 5 ? "Completed ✓" : "In Progress"}
                  </Badge>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    stats.total >= 10 ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className={`h-8 w-8 ${stats.total >= 10 ? "text-green-600" : "text-gray-400"}`} />
                    <div>
                      <div className="font-medium">Master Collector</div>
                      <div className="text-sm text-gray-600">Earn 10 NFTs ({stats.total}/10)</div>
                    </div>
                  </div>
                  <Badge className={stats.total >= 10 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                    {stats.total >= 10 ? "Completed ✓" : "Locked 🔒"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
