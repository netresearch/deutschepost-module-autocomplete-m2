<?php
/**
 * See LICENSE.md for license details.
 */
declare(strict_types=1);

namespace PostDirekt\Autocomplete\ViewModel;

use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use PostDirekt\Autocomplete\Model\AuthService;

/**
 * Class Autocomplete
 *
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 * @link     https://www.netresearch.de/
 */
class Token implements ArgumentInterface
{
    /**
     * @var AuthService
     */
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Provide token from auth service
     */
    public function getToken(): ?string
    {
        try {
            $token = $this->authService->fetchToken();
        } catch (LocalizedException $exception) {
            return null;
        }

        return $token;
    }
}
