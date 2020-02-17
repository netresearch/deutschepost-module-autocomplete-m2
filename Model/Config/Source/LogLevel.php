<?php
/**
 * See LICENSE.md for license details.
 */
declare(strict_types=1);

namespace PostDirekt\Autocomplete\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;
use Magento\Framework\Logger\Monolog;

/**
 * Class LogLevel
 *
 * @author   Andreas Müller <andreas.mueller@netresearch.de>
 * @link     https://www.netresearch.de/
 */
class LogLevel implements OptionSourceInterface
{
    /**
     * @return string[][]
     */
    public function toOptionArray(): array
    {
        return [
            ['value' => (string) Monolog::ERROR, 'label' => __('Errors')],
            ['value' => (string) Monolog::WARNING, 'label' => __('Warnings')],
        ];
    }
}
